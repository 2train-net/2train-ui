import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';

import { Col, Row, Typography, Button as AButton, Card, PageHeader, Dropdown, Menu } from 'antd';

import _ from 'lodash';

import { Button, Icon, Message, Skeleton } from 'shared/modules';
import Droppable from 'shared/modules/droppable/droppable.component';

import { IExercisePayload } from 'modules/exercises/exercises.module';
import {
  ExerciseItemCard,
  WorkoutExerciseItemCard,
  IWorkoutExercisePayload,
  WORKOUT_EXERCISE_MODAL,
  IWorkoutExerciseFormValues,
  WorkoutExerciseDetail,
  SEARCH_EXERCISE_TEXT,
  EXERCISE_NOT_EXISTS_TEXT,
  ExerciseOptionCreate,
  SINGULAR_ROUTINE_TITLE,
  REDUCE_DAY_MODAL,
  NOT_REPEAT_EXERCISES_EXCEPTION,
  WorkoutRoutineForm,
} from 'modules/workout-routines/workout-routines.module';

import {
  IWorkoutRoutinePayload,
  parseDataToColumns,
  updatePositionsAndColumns,
  compareColumns,
  dayOptions,
  findElementInColumn,
  dropdownMenuOptions,
  parseColumnsToData,
} from './drag-and-drop-routine.util';
import useStyles from './drag-drop-routine.style';
import { move, copy, reorder } from './drag-and-drop-routine.actions';
import { ModalContext } from 'shared/contexts';
import WorkoutExerciseForm from '../workout-exercise-form/workout-exercise-form.component';
import {
  ALERT_UNSAVED_MODAL,
  CANCEL_TEXT,
  CREATE_TEXT,
  DAY_TEXT,
  DELETE_MODAL,
  EXERCISES_TEXT,
  EXIT_TEXT,
  SAVE_TEXT,
  SEND_TEXT,
} from 'shared/constants';
import { useHistory, useLocation } from 'react-router-dom';
import { DELETE, DETAIL, EDIT } from 'shared/routes';
import { getIsMobile } from 'shared/util';
import { Field, Select } from 'shared/modules/form';
import { Modal } from 'shared/contexts/modal.context';

interface WorkoutExerciseSubmitValues {
  create: IWorkoutExercisePayload[];
  update: IWorkoutExercisePayload[];
  delete: IWorkoutExercisePayload[];
}

interface IDragAndDropRoutine {
  workoutRoutine?: IWorkoutRoutinePayload;
  options?: IExercisePayload[];
  onSubmit?: (data: WorkoutExerciseSubmitValues, routine?: { name: string }) => void;
  isLoading: boolean;
  importTemplateModal?: Modal;
  isCreateRoutineForm?: boolean;
  onSend?: () => void;
  isEditAvailable?: boolean;
}

const { Title, Text } = Typography;

const DragAndDropRoutine: FC<IDragAndDropRoutine> = ({
  workoutRoutine,
  options,
  onSubmit,
  isLoading,
  importTemplateModal,
  isCreateRoutineForm = false,
  isEditAvailable = true,
  onSend,
}) => {
  const classes = useStyles();

  const [columns, setColumns] = useState<IWorkoutExercisePayload[][]>();

  const modalProvider = useContext(ModalContext);

  const history = useHistory();

  const location = useLocation();

  const { goBack } = history;

  const itemFormRef = useRef<HTMLFormElement>(null);

  const [visible, setVisible] = useState<boolean[]>([]);

  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const [searchBar, setSearchBar] = useState('');

  const [filterOptions, setFilterOptions] = useState<IExercisePayload[] | undefined>();

  const createRoutineFormRef = useRef<HTMLFormElement>(null);

  const [hasImported, setHasImported] = useState(false);

  const [orginalWotkoutRoutine, setOrgininalWorkoutRoutine] = useState<IWorkoutRoutinePayload | undefined>();

  const handleDropdownClick = (e: any) => {
    if (!importTemplateModal) return;
    if (e.key === '1') {
      modalProvider.show(importTemplateModal);
    }
  };

  const modifyColumns = (value: number) => {
    const columnsArray = columns ? _.cloneDeep(columns) : [];

    if (value < columnsArray.length) {
      columnsArray.splice(value, columnsArray.length);
    }

    if (value > columnsArray.length) {
      for (let i = 0; i <= value; i++) {
        if (i > columnsArray.length) {
          columnsArray.splice(i, 0, []);
        }
      }
    }

    setColumns(columnsArray);
  };

  const displayGoBackModal = () => {
    modalProvider.show({
      ...ALERT_UNSAVED_MODAL,
      onConfirm: () => {
        goBack();
      },
    });
  };

  const handleColumnsChange = (name: string, value: number) => {
    if (columns && value < columns?.length) {
      const verify = columns.slice(0, value);
      if (_.isEqual(_.flatten(columns), _.flatten(verify))) {
        modifyColumns(value);
      } else {
        displayReduceDayModal(value);
      }
    } else {
      modifyColumns(value);
    }
  };

  const displayReduceDayModal = (value: number) => {
    modalProvider.show({
      ...REDUCE_DAY_MODAL,
      onConfirm: () => modifyColumns(value),
    });
  };

  const displayCreateExerciseModal = () => {
    modalProvider.show({
      ...WORKOUT_EXERCISE_MODAL,
      title: `${CREATE_TEXT} ${EXERCISES_TEXT}`,
      contentRender: (
        <ExerciseOptionCreate
          onFinishAction={() => {
            setSearchBar('');
            setAreOptionsVisible(true);
            modalProvider.close();
          }}
          searchInput={searchBar}
        />
      ),
      isCancelButtonAvailable: false,
      isSubmitButtonAvailable: false,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(event.target.value);
  };

  const findWorkoutExercise = (uuid: string, columns: IWorkoutExercisePayload[][]) => {
    const result = _.find(columns, (items) => _.some(items, (item) => uuid === item.uuid));
    const item = result ? _.find(result, ['uuid', uuid]) : undefined;
    return item;
  };

  const deleteWorkoutExercise = (uuid: string) => {
    return columns ? columns.map((items) => _.remove(items, (item) => item.uuid !== uuid)) : [];
  };

  const displayDeleteModal = (uuid: string) => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: () => {
        setColumns(updatePositionsAndColumns(deleteWorkoutExercise(uuid)));
        modalProvider.close();
        goBack();
      },
      onCancel: goBack,
    });
  };

  const editWorkoutExercise = (data: IWorkoutExerciseFormValues, uuid: string) => {
    return columns
      ? columns.map((items, column) =>
          items.map((item, position) => {
            return columns[column][position].uuid === uuid
              ? {
                  ...item,
                  ...data,
                }
              : item;
          })
        )
      : [];
  };

  const displayEditModal = (uuid: string) => {
    const element = findWorkoutExercise(uuid, columns ? columns : []);
    modalProvider.show({
      ...WORKOUT_EXERCISE_MODAL,
      title: element?.exercise.name!,
      contentRender: (
        <WorkoutExerciseForm
          initialValues={element}
          onSubmit={(formData: IWorkoutExerciseFormValues) => {
            setColumns(updatePositionsAndColumns(editWorkoutExercise(formData, uuid)));
            goBack();
            modalProvider.close();
          }}
          formRef={itemFormRef}
        />
      ),
      onConfirm: () => {
        itemFormRef?.current?.dispatchEvent(new Event('submit'));
      },
      onCancel: goBack,
      isSubmitButtonAvailable: true,
      cancelText: CANCEL_TEXT,
    });
  };

  const displayDetailModal = (uuid: string) => {
    const element = findWorkoutExercise(uuid, columns ? columns : []);
    modalProvider.show({
      ...WORKOUT_EXERCISE_MODAL,
      title: element?.exercise.name!,
      contentRender: <WorkoutExerciseDetail values={element} />,
      onCancel: goBack,
      isSubmitButtonAvailable: false,
      isCancelButtonAvailable: true,
      cancelText: EXIT_TEXT,
    });
  };

  const displayCreateWorkoutExerciseModal = (
    columns: IWorkoutExercisePayload[][],
    destinationItems: IWorkoutExercisePayload[],
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    modalProvider.show({
      ...WORKOUT_EXERCISE_MODAL,
      contentRender: (
        <WorkoutExerciseForm
          initialValues={undefined}
          onSubmit={(data: IWorkoutExerciseFormValues) => {
            copyCards(columns, destinationItems, source, destination, data);
            modalProvider.close();
          }}
          formRef={itemFormRef}
        />
      ),
      onConfirm: () => {
        itemFormRef?.current?.dispatchEvent(new Event('submit'));
      },
    });
  };

  const copyCards = (
    columns: IWorkoutExercisePayload[][],
    destinationItems: IWorkoutExercisePayload[],
    source: DraggableLocation,
    destination: DraggableLocation,
    formData: IWorkoutExerciseFormValues
  ) => {
    columns[parseInt(destination.droppableId)] = copy(
      filterOptions || [],
      destinationItems,
      source,
      destination,
      formData
    );
    setColumns(updatePositionsAndColumns(columns));
  };

  const reorderCards = (
    columns: IWorkoutExercisePayload[][],
    source: DraggableLocation,
    destination: DraggableLocation,
    sourceItems: IWorkoutExercisePayload[]
  ) => {
    columns[parseInt(destination.droppableId)] = reorder(sourceItems, source.index, destination.index);
    setColumns(updatePositionsAndColumns(columns));
  };

  const moveCards = (
    sourceItems: IWorkoutExercisePayload[],
    destinationItems: IWorkoutExercisePayload[],
    source: DraggableLocation,
    destination: DraggableLocation,
    columns: IWorkoutExercisePayload[][]
  ) => {
    setColumns(updatePositionsAndColumns(move(sourceItems, destinationItems, source, destination, columns)));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === 'OPTIONS') return;

    const { source, destination } = result;

    const columnsCopy = columns ? _.cloneDeep(columns) : [];

    const sourceItems = columnsCopy[parseInt(source.droppableId)];
    const destItems = columnsCopy[parseInt(destination.droppableId)];

    const isDraggingInSameColumn = source.droppableId === destination.droppableId;
    const isDraggingToOptions = source.droppableId === 'OPTIONS';

    if (isDraggingInSameColumn) {
      reorderCards(columnsCopy, source, destination, sourceItems);
    } else if (isDraggingToOptions) {
      const sourceOptionsSelectedItemId = filterOptions ? filterOptions[source.index].uuid : '';
      if (!findElementInColumn(sourceOptionsSelectedItemId, destItems)) {
        displayCreateWorkoutExerciseModal(columnsCopy, destItems, source, destination);
      } else {
        Message.info(NOT_REPEAT_EXERCISES_EXCEPTION);
      }
    } else {
      if (!findElementInColumn(sourceItems[source.index].exercise.uuid, destItems)) {
        moveCards(sourceItems, destItems, source, destination, columnsCopy);
      } else {
        Message.info(NOT_REPEAT_EXERCISES_EXCEPTION);
      }
    }
  };

  const saveWorkoutRoutine = () => {
    if (isCreateRoutineForm) {
      createRoutineFormRef?.current?.dispatchEvent(new Event('submit'));
    } else {
      orginalWotkoutRoutine?.workoutExercises &&
        onSubmit &&
        onSubmit(
          parseColumnsToData(updatePositionsAndColumns(columns ? columns : []), orginalWotkoutRoutine?.workoutExercises)
        );
    }
  };

  useEffect(() => {
    if (columns && !!columns.length) {
      setHasImported(true);
    }

    if (columns && !columns.length) {
      setOrgininalWorkoutRoutine(workoutRoutine);
    }

    setColumns(parseDataToColumns(workoutRoutine?.workoutExercises));
  }, [workoutRoutine]);

  useEffect(() => {
    if (columns && columns.length !== visible.length) setVisible(Array(columns.length).fill(!getIsMobile()));
  }, [columns]);

  useEffect(() => {
    const { search } = location;

    const [, actionSearch = '', itemSearch = ''] = search.split('&');

    const [, action] = actionSearch.split('=');
    const [, uuid] = itemSearch.split('=');

    if (action && uuid) {
      if (action === DELETE) {
        displayDeleteModal(uuid);
      } else if (action === EDIT) {
        displayEditModal(uuid);
      } else if (action === DETAIL) {
        displayDetailModal(uuid);
      }
    }
  }, [location]);

  useEffect(() => {
    if (options) {
      setFilterOptions(options.filter((option) => option.name.toLowerCase().includes(searchBar.toLowerCase())));
      if (!areOptionsVisible) {
        setAreOptionsVisible(true);
      } else if (searchBar === '') {
        setAreOptionsVisible(false);
      }
    }
  }, [searchBar]);

  useEffect(() => {
    if (!filterOptions && options) {
      setFilterOptions(options);
    }
  }, [options]);

  const haveValuesChanged = workoutRoutine
    ? compareColumns(updatePositionsAndColumns(parseDataToColumns(workoutRoutine?.workoutExercises)), columns)
    : false;

  return (
    <div className={classes.root}>
      <PageHeader
        ghost={false}
        title={SINGULAR_ROUTINE_TITLE}
        onBack={haveValuesChanged ? () => displayGoBackModal() : goBack}
        extra={
          isEditAvailable
            ? [
                <div key="header" className="header-actions">
                  {
                    <Select
                      name="days"
                      value={columns?.length || 3}
                      options={dayOptions}
                      setFieldValue={handleColumnsChange}
                    />
                  }
                  {(haveValuesChanged || hasImported) && (
                    <Button
                      type="button"
                      size="small"
                      loading={isLoading}
                      onClick={saveWorkoutRoutine}
                      disabled={isLoading || !_.flatten(columns).length || (!haveValuesChanged && !hasImported)}
                    >
                      {SAVE_TEXT}
                    </Button>
                  )}
                  {workoutRoutine &&
                    workoutRoutine.isDraft &&
                    !isCreateRoutineForm &&
                    !haveValuesChanged &&
                    !hasImported && (
                      <Button
                        type="button"
                        size="small"
                        loading={isLoading}
                        onClick={onSend}
                        disabled={isLoading || !_.flatten(columns).length}
                        color="secondary"
                      >
                        {SEND_TEXT}
                      </Button>
                    )}

                  <Dropdown.Button
                    overlay={
                      <Menu onClick={handleDropdownClick}>
                        {dropdownMenuOptions.map((item) => (
                          <Menu.Item key={item.value}>{item.label}</Menu.Item>
                        ))}
                      </Menu>
                    }
                    placement="bottomCenter"
                    icon={<Icon type="more" />}
                  ></Dropdown.Button>
                </div>,
              ]
            : []
        }
      >
        {isCreateRoutineForm && (
          <WorkoutRoutineForm
            initialValues={workoutRoutine?.name ? { name: workoutRoutine.name } : { name: 'name' }}
            onSubmit={(data: { name: string }) => {
              onSubmit &&
                onSubmit(
                  parseColumnsToData(
                    updatePositionsAndColumns(columns ? columns : []),
                    workoutRoutine!.workoutExercises
                  ),
                  data
                );
            }}
            formRef={createRoutineFormRef}
          />
        )}
      </PageHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row className="columns">
          <Col span={24}>
            <Row gutter={16} justify="space-between" align="middle">
              <Skeleton isLoading={isLoading} type="card" multiple={3}>
                {columns
                  ? columns.map((items, columnIndex) => (
                      <Col
                        key={columnIndex}
                        xs={24}
                        sm={12}
                        lg={columns?.length >= 4 ? 6 : 24 / columns?.length}
                        style={{ marginTop: 16 }}
                      >
                        <div className="column-header">
                          <Title level={5}>{`${DAY_TEXT} ${columnIndex + 1}`}</Title>
                          <AButton
                            shape="circle"
                            onClick={() => {
                              setVisible(visible.map((item, index) => (index === columnIndex ? !item : item)));
                            }}
                          >
                            <Icon type={visible[columnIndex] ? 'up' : 'down'} />
                          </AButton>
                        </div>

                        <Droppable
                          id={columnIndex.toString()}
                          direction="vertical"
                          items={items}
                          isDragDisabled={!isEditAvailable}
                          isDropDisabled={!isEditAvailable}
                          renderCard={WorkoutExerciseItemCard}
                          isVisible={visible[columnIndex]}
                        />
                      </Col>
                    ))
                  : []}
              </Skeleton>
            </Row>
          </Col>
        </Row>

        {options && !isLoading ? (
          <Card className="footer">
            <div className="search-container">
              <Field
                value={searchBar}
                placeholder={SEARCH_EXERCISE_TEXT}
                name="search"
                onChange={handleSearchChange}
                clearable
              />
              <AButton shape="circle" onClick={() => setAreOptionsVisible(!areOptionsVisible)}>
                <Icon type={areOptionsVisible ? 'up' : 'down'} />
              </AButton>
            </div>
            {filterOptions?.length ? (
              <Droppable
                id="OPTIONS"
                direction="horizontal"
                items={filterOptions || []}
                renderCard={ExerciseItemCard}
                isDropDisabled
                isVisible={areOptionsVisible}
              />
            ) : (
              <div
                className="create-options-container"
                style={filterOptions?.length || !areOptionsVisible ? { display: 'none' } : {}}
              >
                <Text type="secondary">{EXERCISE_NOT_EXISTS_TEXT}</Text>
                <Button size="small" onClick={displayCreateExerciseModal}>
                  {CREATE_TEXT}
                </Button>
              </div>
            )}
          </Card>
        ) : (
          ''
        )}
      </DragDropContext>
    </div>
  );
};

export default DragAndDropRoutine;
