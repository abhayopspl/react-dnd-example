import React from "react";
import ReactDOM from "react-dom";
import Content from "./initialData";
import "@atlaskit/css-reset";
import Column from "./columnComponent";
import { DragDropContext } from "react-beautiful-dnd";
import Styled from "styled-components";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Content;
  }

  componentDidMount() {}

  /**
   * @argument result
   * {
   *    draggableId: "",
   *    type: "",
   *    reason: "DROP",
   *    source: {
   *        droppableId: "column-1",
   *        index: 0
   *    },
   *    destination: {
   *        droppableId:  "column-1",
   *        index: 1
   *    }
   * }
   */
  onDragEnd = result => {};

  //Step I to implement the react-beautiful-dnd is to make sure that the DragDropContext is added to the root of the component
  //DragDropContext requried onDragEnd func to be passed as a prop. This functon is responsible for handling what happens when a draggable is dropped in the droppable. This also gets triggered if the draggable is dropped outside of any droppable.
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.tasksIds.map(taskId => this.state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
