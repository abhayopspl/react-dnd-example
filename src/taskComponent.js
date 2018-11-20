import React from "react";
import Styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = Styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background: white;
`;
//Step III would be to implement the lowest component iin the DND as the Draggable component
//Draggable has two props requirement.
//DraggableID unique across the context
//Secondly it requires an index
//NOTE THAT ref has to be passed the provided.innerRef
export default class Task extends React.Component {
  render() {
    return (
      <Draggable index={this.props.index} draggableId={this.props.task.id}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
