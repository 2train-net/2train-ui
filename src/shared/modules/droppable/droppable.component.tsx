import _ from 'lodash';

import React, { FC } from 'react';

import { Direction, Droppable as RBDroppable } from 'react-beautiful-dnd';

import Draggable from 'shared/modules/draggable/draggable.component';

interface IDroppableValues {
  id: string;
  direction?: Direction;
  items: { uuid: string }[];
  renderCard: FC<any>;
  isDropDisabled?: boolean;
  isDragDisabled?: boolean;
  isVisible: boolean;
}
const Droppable: FC<IDroppableValues> = ({
  id,
  direction = 'vertical',
  isVisible,
  items,
  renderCard,
  isDropDisabled = false,
  isDragDisabled = false,
}) => {
  return (
    <RBDroppable droppableId={id} direction={direction} isDropDisabled={isDropDisabled}>
      {(provided, snapshot) => {
        return (
          <div
            data-testid="droppable"
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              isVisible
                ? direction === 'horizontal'
                  ? snapshot.isDraggingOver
                    ? 'horizontal-droppable-dragging'
                    : 'horizontal-droppable'
                  : snapshot.isDraggingOver
                  ? 'vertical-droppable-dragging'
                  : 'vertical-droppable'
                : 'notVisible'
            }
          >
            {items.map((item: { uuid: string }, position: number) => (
              <Draggable
                key={item.uuid}
                id={item.uuid}
                position={position}
                item={item}
                renderCard={renderCard}
                isDragDisabled={isDragDisabled}
              />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </RBDroppable>
  );
};
const areEqual = (prevProps: IDroppableValues, nextProps: IDroppableValues) => {
  return _.isEqual(prevProps.items, nextProps.items) && prevProps.isVisible === nextProps.isVisible;
};

export default React.memo(Droppable, areEqual);
