import _ from 'lodash';

import React, { FC } from 'react';

import { Draggable as RBDraggable } from 'react-beautiful-dnd';

import { ICard, Item } from 'shared/modules/drag-and-drop-routine/shared/model';

interface IDraggableValues {
  position: number;
  id: string;
  item: Item;
  renderCard: FC<ICard>;
  isDragDisabled?: boolean;
}

const Draggable: FC<IDraggableValues> = ({ id, position, item, renderCard: Card, isDragDisabled = false }) => {
  return (
    <RBDraggable isDragDisabled={isDragDisabled} draggableId={id} index={position}>
      {(provided, snapshot) => {
        return (
          <div
            className="draggable"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
          >
            <Card data={item}></Card>
          </div>
        );
      }}
    </RBDraggable>
  );
};
const areEqual = (prevProps: IDraggableValues, nextProps: IDraggableValues) => {
  return _.isEqual(prevProps, nextProps);
};

export default React.memo(Draggable, areEqual);
