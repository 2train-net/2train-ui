import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Col, PageHeader, Row, Typography, Button as AButton } from 'antd';

import _ from 'lodash';

import Droppable from 'shared/modules/droppable/droppable.component';

import { Button, Icon, Skeleton } from 'shared/modules';
import { Select, Field } from 'shared/modules/form';

import { ModalContext } from 'shared/contexts';
import { Modal } from 'shared/contexts/modal.context';

import { DELETE_MODAL } from 'shared/constants';
import { DELETE, DETAIL, EDIT } from 'shared/routes';

import { move, copy, reorder } from './actions';
import {
  dayOptions,
  findElement,
  parseColumnsToData,
  parseDataToColumns,
  updatePositionsAndColumns
} from './drag-and-drop-routine.util';
import { ColumnItem, FormData, ICard, Option } from './column-items.interface';

import useStyles from './drag-drop-routine.style';

interface IDragAndDropRoutineValues {
  data?: ColumnItem[];
  options?: Option[];
  renderColumnCard: FC<ICard>;
  renderOptionCard: FC<ICard>;
  renderForm: FC<FormData>;
  formModal: Modal;
  isEditModeEnabled?: boolean;
  isLoading?: boolean;
  onSubmit: (data: any) => any;
  maxColumn: number;
}

const { Title } = Typography;

const DragAndDropRoutine: FC<IDragAndDropRoutineValues> = ({
  data,
  options,
  renderColumnCard: ColumnCard,
  renderOptionCard: OptionCard,
  renderForm: Form,
  formModal,
  isEditModeEnabled = true,
  isLoading = true,
  maxColumn,
  onSubmit
}) => {
  const classes = useStyles({});

  const [columns, setColumns] = useState<ColumnItem[][] | undefined>();

  const [filterOptions, setFilterOptions] = useState<Option[] | undefined>();

  const [searchBar, setSearchBar] = useState('');

  const location = useLocation();

  const history = useHistory();

  const modalProvider = useContext(ModalContext);

  const itemFormRef = useRef<HTMLFormElement>(null);

  const { goBack } = history;

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
                  data: {
                    ...data,
                    ...item.data
                  }
                }
              : item;
          })
        )
      : [];
  };

  const displayEditModal = (uuid: string) => {
    modalProvider.show({
      ...formModal,
      title: isEditModeEnabled ? 'Editar' : 'Detalle',
      contentRender: (
        <Form
          initialValues={findElement(uuid, columns ? columns : [])?.data}
          onSubmit={(formData: FormData) => {
            setColumns(updatePositionsAndColumns(editElement(formData, uuid)));
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
      isSubmitButtonAvailable: isEditModeEnabled,
      cancelText: isEditModeEnabled ? 'Cancelar' : 'Salir'
    });
  };

  const handleColumnsChange = (name: string, value: number) => {
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

  const handleSearchChange = (e: string | React.ChangeEvent<HTMLInputElement>) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    setSearchBar(event.target.value);
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
        modalProvider.show({
          ...formModal,
          contentRender: (
            <Form
              initialValues={undefined}
              onSubmit={(data: FormData) => {
                columnsCopy[parseInt(destination.droppableId)] = copy(
                  options || [],
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
          ),
          onConfirm: () => {
            itemFormRef?.current?.dispatchEvent(new Event('submit'));
          }
        });
        break;

      default:
        setColumns(updatePositionsAndColumns(move(sourceItems, destItems, source, destination, columnsCopy)));
        break;
    }
  };

  useEffect(() => {
    if (options) {
      setFilterOptions(options.filter(option => option.name.toLowerCase().includes(searchBar.toLowerCase())));
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
        displayEditModal(uuid);
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
    if (columns && columns.length !== visible.length) setVisible(Array(columns.length).fill(true));
  }, [columns]);

  const [visible, setVisible] = useState<boolean[]>([]);

  return (
    <div className={classes.root}>
      <PageHeader
        ghost={false}
        title="Rutina de ejercicios"
        onBack={goBack}
        extra={[
          <div key="header" className="header-actions">
            {isEditModeEnabled && (
              <Select
                name="days"
                value={columns?.length || 0}
                options={dayOptions}
                setFieldValue={handleColumnsChange}
              />
            )}
            {isEditModeEnabled && (
              <Button
                onClick={
                  data
                    ? () => onSubmit(parseColumnsToData(updatePositionsAndColumns(columns ? columns : []), data))
                    : () => {}
                }
                type="button"
                size="small"
              >
                Guardar
              </Button>
            )}
          </div>
        ]}
      />
      <DragDropContext onDragEnd={isEditModeEnabled ? result => onDragEnd(result) : () => {}}>
        <Row style={{ marginBottom: 16, marginTop: 16 }}>
          <Col span={24}>
            {isLoading && <Title level={5}>Días</Title>}
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
                          <Title level={5}>{`Día ${columnIndex + 1}`}</Title>
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
                        />
                      </Col>
                    ))
                  : []}
              </Row>
            </Skeleton>
          </Col>
        </Row>

        <Title level={5}>Ejercicios</Title>
        <Col className="search-container" span={24}>
          <Field value={searchBar} placeholder="Buscar ejercicio" name="search" onChange={handleSearchChange} />
        </Col>
        <Skeleton isLoading={isLoading}>
          <Droppable
            id="OPTIONS"
            direction="horizontal"
            items={filterOptions || []}
            renderCard={OptionCard}
            isDropDisabled
            isVisible={true}
          />
        </Skeleton>
      </DragDropContext>
    </div>
  );
};

export default DragAndDropRoutine;
