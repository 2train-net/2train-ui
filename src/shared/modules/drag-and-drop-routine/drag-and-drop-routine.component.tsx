import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Col, PageHeader, Row, Typography, Button as AButton, Card } from 'antd';

import _ from 'lodash';

import Droppable from 'shared/modules/droppable/droppable.component';

import { getIsMobile } from 'shared/util';
import { ModalContext } from 'shared/contexts';
import { Select, Field } from 'shared/modules/form';
import { Modal } from 'shared/contexts/modal.context';
import { Button, Icon, Message, Skeleton } from 'shared/modules';

import {
  DELETE_MODAL,
  ALERT_UNSAVED_MODAL,
  CANCEL_TEXT,
  EXIT_TEXT,
  SAVE_TEXT,
  DAY_TEXT,
  DAYS_TEXT,
  CREATE_TEXT
} from 'shared/constants';
import { DELETE, DETAIL, EDIT } from 'shared/routes';

import { move, copy, reorder } from './drag-and-drop-routine.actions';
import {
  compareColumns,
  dayOptions,
  findElement,
  findElementInColumn,
  parseColumnsToData,
  parseDataToColumns,
  updatePositionsAndColumns
} from './drag-and-drop-routine.util';

import { ColumnItem, DetailData, FormData, ICard, Option, OptionFormData } from './shared/model';

import {
  OPTION_NOT_EXISTS_TEXT,
  NOT_REPEAT_ELEMENTS_EXCEPTION,
  REDUCE_DAY_MODAL,
  SEARCH_OPTION_TEXT,
  OPTIONS_TEXT
} from './shared/constants';

import useStyles from './drag-drop-routine.style';

interface IDragAndDropRoutineValues {
  data?: ColumnItem[];
  options?: Option[];
  renderColumnCard: FC<ICard>;
  renderOptionCard: FC<ICard>;
  renderForm?: FC<FormData>;
  renderDetail?: FC<DetailData>;
  createOptionsRenderForm?: FC<OptionFormData>;
  formModal: Modal;
  isEditModeEnabled?: boolean;
  isLoading?: boolean;
  onSubmit?: (data: any) => any;
  maxColumn: number;
  acceptsRepeated?: boolean;
  routineTitle: string;
  optionsTitle?: string;
  searchOptionText?: string;
  optionNotExistsText?: string;
  notRepeatOptionsText?: string;
}

const { Title, Text } = Typography;

const DragAndDropRoutine: FC<IDragAndDropRoutineValues> = ({
  data,
  options,
  renderColumnCard: ColumnCard,
  renderOptionCard: OptionCard,
  renderForm: Form,
  renderDetail: Detail,
  createOptionsRenderForm: OptionForm,
  formModal,
  isEditModeEnabled = true,
  isLoading = true,
  maxColumn,
  acceptsRepeated = true,
  onSubmit,
  routineTitle,
  optionsTitle = OPTIONS_TEXT,
  searchOptionText = SEARCH_OPTION_TEXT,
  optionNotExistsText = OPTION_NOT_EXISTS_TEXT,
  notRepeatOptionsText = NOT_REPEAT_ELEMENTS_EXCEPTION
}) => {
  const classes = useStyles();

  const [columns, setColumns] = useState<ColumnItem[][] | undefined>();

  const [filterOptions, setFilterOptions] = useState<Option[] | undefined>();

  const [searchBar, setSearchBar] = useState('');

  const location = useLocation();

  const history = useHistory();

  const modalProvider = useContext(ModalContext);

  const itemFormRef = useRef<HTMLFormElement>(null);

  const { goBack } = history;

  const displayReduceDayModal = (value: number) => {
    modalProvider.show({
      ...REDUCE_DAY_MODAL,
      onConfirm: () => modifyColumns(value)
    });
  };

  const displayGoBackModal = () => {
    modalProvider.show({
      ...ALERT_UNSAVED_MODAL,
      onConfirm: () => {
        goBack();
      }
    });
  };

  const displayCreateOptionsModal = () => {
    modalProvider.show({
      ...formModal,
      title: `${CREATE_TEXT} ${optionsTitle}`,
      contentRender: OptionForm ? (
        <OptionForm
          onFinishAction={() => {
            setSearchBar('');
            setAreOptionsVisible(true);
            modalProvider.close();
          }}
          searchInput={searchBar}
        />
      ) : (
        <></>
      ),
      isCancelButtonAvailable: false,
      isSubmitButtonAvailable: false
    });
  };
  const deleteElement = (uuid: string) => {
    return columns ? columns.map(items => _.remove(items, item => item.uuid !== uuid)) : [];
  };

  const displayDeleteModal = (uuid: string) => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: () => {
        setColumns(updatePositionsAndColumns(deleteElement(uuid)));
        modalProvider.close();
        goBack();
      },
      onCancel: goBack
    });
  };

  const editElement = (data: FormData, uuid: string) => {
    return columns
      ? columns.map((items, column) =>
          items.map((item, position) => {
            return columns[column][position].uuid === uuid
              ? {
                  ...item,
                  data
                }
              : item;
          })
        )
      : [];
  };

  const displayEditModal = (uuid: string) => {
    const element = findElement(uuid, columns ? columns : []);
    modalProvider.show({
      ...formModal,
      title: element?.option.name!,
      contentRender: Form ? (
        <Form
          initialValues={element?.data}
          onSubmit={(formData: FormData) => {
            setColumns(updatePositionsAndColumns(editElement(formData, uuid)));
            goBack();
            modalProvider.close();
          }}
          formRef={itemFormRef}
        />
      ) : (
        undefined
      ),
      onConfirm: () => {
        itemFormRef?.current?.dispatchEvent(new Event('submit'));
      },
      onCancel: goBack,
      isSubmitButtonAvailable: isEditModeEnabled,
      cancelText: isEditModeEnabled ? CANCEL_TEXT : EXIT_TEXT
    });
  };

  const displayDetailModal = (uuid: string) => {
    const element = findElement(uuid, columns ? columns : []);
    modalProvider.show({
      ...formModal,
      title: element?.option.name!,
      contentRender: Detail ? <Detail values={element?.data} /> : undefined,
      onCancel: goBack,
      isSubmitButtonAvailable: false,
      isCancelButtonAvailable: true,
      cancelText: EXIT_TEXT
    });
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === 'OPTIONS') return;

    const { source, destination } = result;

    const columnsCopy = columns ? _.cloneDeep(columns) : [];

    const sourceItems = columnsCopy[parseInt(source.droppableId)];
    const destItems = columnsCopy[parseInt(destination.droppableId)];

    switch (source.droppableId) {
      case destination.droppableId:
        columnsCopy[parseInt(destination.droppableId)] = reorder(sourceItems, source.index, destination.index);
        setColumns(updatePositionsAndColumns(columnsCopy));
        break;

      case 'OPTIONS':
        const sourceOptionsSelectedItemId = filterOptions ? filterOptions[source.index].uuid : '';
        if ((!findElementInColumn(sourceOptionsSelectedItemId, destItems) && !acceptsRepeated) || acceptsRepeated) {
          modalProvider.show({
            ...formModal,
            contentRender: Form ? (
              <Form
                initialValues={undefined}
                onSubmit={(data: FormData) => {
                  columnsCopy[parseInt(destination.droppableId)] = copy(
                    filterOptions || [],
                    destItems,
                    source,
                    destination,
                    data
                  );
                  setColumns(updatePositionsAndColumns(columnsCopy));
                  modalProvider.close();
                }}
                formRef={itemFormRef}
              />
            ) : (
              undefined
            ),
            onConfirm: () => {
              itemFormRef?.current?.dispatchEvent(new Event('submit'));
            }
          });
        } else {
          Message.info(notRepeatOptionsText);
        }
        break;

      default:
        if (
          (!findElementInColumn(sourceItems[source.index].option.uuid, destItems) && !acceptsRepeated) ||
          acceptsRepeated
        ) {
          setColumns(updatePositionsAndColumns(move(sourceItems, destItems, source, destination, columnsCopy)));
        } else {
          Message.info(notRepeatOptionsText);
        }
        break;
    }
  };

  useEffect(() => {
    if (options) {
      setFilterOptions(options.filter(option => option.name.toLowerCase().includes(searchBar.toLowerCase())));
      if (!areOptionsVisible) {
        setAreOptionsVisible(true);
      } else if (searchBar === '') {
        setAreOptionsVisible(false);
      }
    }
  }, [searchBar]);

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
    if (!columns && data) {
      setColumns(parseDataToColumns(data, maxColumn));
    }
  }, [data]);

  useEffect(() => {
    if (!filterOptions && options) {
      setFilterOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (columns && columns.length !== visible.length) setVisible(Array(columns.length).fill(!getIsMobile()));
  }, [columns]);

  const [visible, setVisible] = useState<boolean[]>([]);
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const haveValuesChanged = data ? compareColumns(parseDataToColumns(data, maxColumn), columns) : false;

  return (
    <div className={classes.root}>
      <PageHeader
        ghost={false}
        title={routineTitle}
        onBack={isEditModeEnabled ? (haveValuesChanged ? () => displayGoBackModal() : goBack) : goBack}
        extra={[
          <div key="header" className="header-actions">
            {isEditModeEnabled && (
              <Select
                name="days"
                value={columns?.length || 3}
                options={dayOptions}
                setFieldValue={handleColumnsChange}
              />
            )}
            {isEditModeEnabled && (
              <Button
                onClick={
                  data
                    ? () => {
                        onSubmit &&
                          onSubmit(parseColumnsToData(updatePositionsAndColumns(columns ? columns : []), data));
                      }
                    : () => {}
                }
                type="button"
                size="small"
                disabled={!haveValuesChanged}
                loading={isLoading}
              >
                {SAVE_TEXT}
              </Button>
            )}
          </div>
        ]}
      />
      <DragDropContext onDragEnd={isEditModeEnabled ? result => onDragEnd(result) : () => {}}>
        <Row className="columns">
          <Col span={24}>
            {isLoading && <Title level={5}>{DAYS_TEXT}</Title>}
            <Skeleton isLoading={isLoading}>
              <Row gutter={16} justify="center" align="middle">
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
                          renderCard={ColumnCard}
                          isDropDisabled={!isEditModeEnabled}
                          isVisible={visible[columnIndex]}
                          isDragDisabled={!isEditModeEnabled}
                        />
                      </Col>
                    ))
                  : []}
              </Row>
            </Skeleton>
          </Col>
        </Row>

        {options && !isLoading ? (
          <Card className="footer">
            <div className="search-container">
              <Field
                value={searchBar}
                placeholder={searchOptionText}
                name="search"
                onChange={handleSearchChange}
                clearable
              />
              <AButton shape="circle" onClick={() => setAreOptionsVisible(!areOptionsVisible)}>
                <Icon type={areOptionsVisible ? 'up' : 'down'} />
              </AButton>
            </div>
            <Skeleton isLoading={isLoading}>
              {filterOptions?.length ? (
                <Droppable
                  id="OPTIONS"
                  direction="horizontal"
                  items={filterOptions || []}
                  renderCard={OptionCard}
                  isDropDisabled
                  isVisible={areOptionsVisible}
                />
              ) : (
                <div
                  className="create-options-container"
                  style={filterOptions?.length || !areOptionsVisible ? { display: 'none' } : {}}
                >
                  <Text type="secondary">{optionNotExistsText}</Text>
                  <Button size="small" onClick={displayCreateOptionsModal}>
                    {CREATE_TEXT}
                  </Button>
                </div>
              )}
            </Skeleton>
          </Card>
        ) : (
          ''
        )}
      </DragDropContext>
    </div>
  );
};

export default DragAndDropRoutine;
