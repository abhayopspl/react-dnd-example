import React from "react";
import ReactDOM from "react-dom";
import Content from "./initialData";
import "@atlaskit/css-reset";
import Column from "./columnComponent";
import { DragDropContext } from "react-beautiful-dnd";
import Styled from "styled-components";

const Container = Styled.div`
  display: flex;
`;

/*
const start = {
  draggableId: "ID",
  type: "TYPE",
  source: {
    droppableId: "ID",
    index: 0
  }
}

const update = {
  ...start,
  destination: {
    droppableId: "ID",
    index: 1
  }
}

const result = {
  ...update,
  reason: "DROP"
}
THESE VALUES CAN BE USED TO UPDATE THE GLOBAL STYLES Inside the onDragStart and onDragEnd functions
*/
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
   * The destination can be null at times when the drop is outside the list
   */
  onDragEnd = result => {
    let { draggableId, source, destination } = result;

    if (!destination) {
      //This means that the drop is made outside the list
      //do nothing
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //If this is true it means the user dropped the item at the same position where it started
      //Do nothing
      return;
    }

    const startColumn = this.state.columns[source.droppableId];
    const finishColumn = this.state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      //This means that the DnD is within the same column
      const newTaskIds = Array.from(startColumn.tasksIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      console.log(newTaskIds);
      const newColumn = {
        ...startColumn,
        tasksIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      this.setState(newState);
      return;
    }

    //If the DnD is done between two different columns then
    const startTasksIds = Array.from(startColumn.tasksIds);
    const newStartTasksIds = {
      ...startColumn,
      tasksIds: startTasksIds
    };

    const finishTaskIds = Array.from(finishColumn.tasksIds);
    finishTaskIds.splice(source.index, 1);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishTasksIds = {
      ...finishColumn,
      tasksIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartTasksIds.id]: newStartTasksIds,
        [newFinishTasksIds.id]: newFinishTasksIds
      }
    };
    this.setState(newState);
    return;
  };

  onDragStart = () => {
    //update color and CSS here
  };

  //Step I to implement the react-beautiful-dnd is to make sure that the DragDropContext is added to the root of the component
  //DragDropContext requried onDragEnd func to be passed as a prop. This functon is responsible for handling what happens when a draggable is dropped in the droppable. This also gets triggered if the draggable is dropped outside of any droppable.
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.tasksIds.map(
              taskId => this.state.tasks[taskId]
            );
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
