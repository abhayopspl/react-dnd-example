import React from "react";
import Styled from "styled-components";
import Task from "./taskComponent";
import { Droppable } from "react-beautiful-dnd";

const Container = Styled.div`
  margin: 8px;
  border: 1px ridge lightgrey;
  border-radius: 5px;
  background: white;
`;
const Title = Styled.h3`
  padding: 8px;
`;
const TaskList = Styled.div`
  padding: 8px;
  transition: background-color 0.5s ease-in-out;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
`;
//Step two is to make the DIV where the DnD is to be targetted as a Droppable.
//Droppable required one compulsory prop that is the DroppableID.
//DroppableID must be unique inside the DragDropContext.
//A Droppable utilises the render prop pattern and expects its child to be a function that returns a react component.
//The reason why render props pattern is used  is to avoid creating additional DOM nodes for the components that is within it. This way react-beautiful-dnd latches into the existing structure.
//provided object has a property called droppableProps. These props must be applied ot the component that should work as the Droppable. For additional props related to these, check the documentation.
//provided object has a property called innerRef which is used to return the DOM node of the droppable component.
//Last thing to do is to insert the placeholder. Placeholder is  needed to increase the space in the react component during the drag. The placeholder needs to be added as a child of the component that you designate as a Droppable.

export default class Column extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task index={index} key={task.id} task={task} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
