import React from "react";
import Styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = Styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background: ${props => (props.isDragging ? "lightyellow" : "white")};
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
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
