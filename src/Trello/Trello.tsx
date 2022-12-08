import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Trello = () => {
  const onDragEnd = () => {};
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(magic) => (
              <ul ref={magic.innerRef} {...magic.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {(magic) => (
                    <li
                      ref={magic.innerRef}
                      {...magic.draggableProps}
                      //   <span>불</span>
                    >
                      <span {...magic.dragHandleProps}>👿</span>
                      One
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {(magic) => (
                    <li ref={magic.innerRef} {...magic.draggableProps}>
                      <span {...magic.dragHandleProps}>👿</span>
                      Two
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Trello;
