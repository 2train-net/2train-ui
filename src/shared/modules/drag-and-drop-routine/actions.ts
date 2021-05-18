import { DraggableLocation } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { FormData, ColumnItem, Item } from './column-items.interface';

export const reorder = (list: ColumnItem[], startIndex: number, endIndex: number) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const copy = (
  source: Item[],
  destination: ColumnItem[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
  formData: FormData
) => {
  const sourceClone = source;
  const destClone = destination;
  const option = sourceClone[droppableSource.index];

  const data: ColumnItem = {
    uuid: uuid(),
    option: option,
    column: parseInt(droppableDestination.droppableId),
    position: droppableDestination.index,
    data: formData
  };
  destClone.splice(droppableDestination.index, 0, data);

  return destClone;
};

export const move = (
  source: ColumnItem[],
  destination: ColumnItem[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
  columns: ColumnItem[][]
) => {
  const sourceClone = source;
  const destClone = destination;

  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  columns[parseInt(droppableSource.droppableId)] = sourceClone;
  columns[parseInt(droppableDestination.droppableId)] = destClone;

  return columns;
};
