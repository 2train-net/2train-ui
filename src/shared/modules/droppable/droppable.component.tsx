import _ from 'lodash';

import React, { FC } from 'react';

import { Direction, Droppable as RBDroppable } from 'react-beautiful-dnd';

import { Item } from 'shared/modules/drag-and-drop-routine/column-items.interface';

import Draggable from 'shared/modules/draggable/draggable.component';

interface IDroppableValues {
  id: string;
  direction?: Direction;
  items: Item[];
  renderCard: FC<any>;
  isDropDisabled?: boolean;
}
const Droppable: FC<IDroppableValues> = ({ id, direction = 'vertical', items, renderCard, isDropDisabled = false }) => {
  return (
    <RBDroppable droppableId={id} direction={direction} isDropDisabled={isDropDisabled}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              direction === 'horizontal'
                ? snapshot.isDraggingOver
                  ? 'horizontal-droppable-dragging'
                  : 'horizontal-droppable'
                : snapshot.isDraggingOver
                ? 'vertical-droppable-dragging'
                : 'vertical-droppable'
            }
          >
            {items.map((item: Item, position: number) => (
              <Draggable key={item.uuid} id={item.uuid} position={position} item={item} renderCard={renderCard} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </RBDroppable>
  );
};
const areEqual = (prevProps: IDroppableValues, nextProps: IDroppableValues) => {
  return _.isEqual(prevProps.items, nextProps.items);
};

export default React.memo(Droppable, areEqual);
