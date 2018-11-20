import React from "react";
import Styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = Styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  background: ${props => (props.isDragging ? "lightyellow" : "white")};
`;
const Handle = Styled.div`
  width: 20px;
  height: 20px;
  align-self: center;
  background: url('https://firebasestorage.googleapis.com/v0/b/aglivetest.appspot.com/o/noun_drag_1654390.svg?alt=media&token=11f3a464-dee4-4a2b-8e74-f7e3a71716f7') no-repeat;
  background-size: cover;
  background-color: lightgrey;
  border-radius: 10px;
  float: right;
`;

//Step III would be to implement the lowest component iin the DND as the Draggable component
//Draggable has two props requirement.
//DraggableID unique across the context
//Secondly it requires an index
//NOTE THAT ref has to be passed the provided.innerRef

//snapshot contains properties that we can use to style a component during a drag
/**
 * draggableSnapshot = {
 *    isDragging: true,
 *    draggingOver: "droppableId"
 * }
 * droppableSnapshot = {
 *    isDraggingOver: true,
 *    draggingOverWith: "DraggableID"
 * }
 */
export default class Task extends React.Component {
  render() {
    return (
      <Draggable index={this.props.index} draggableId={this.props.task.id}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/*
            If dragHandleProps is passed only to the handle then only that can be used to drag the entire draggable
            This is very useful if you want to limit the user to only use the handle to move the components
           */}
            <Handle {...provided.dragHandleProps} />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
