export default {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Cleanse the world"
    },
    "task-2": {
      id: "task-2",
      content: "Juice the Jews"
    },
    "task-3": {
      id: "task-3",
      content: "Khazars are Ashqnazis"
    },
    "task-4": {
      id: "task-4",
      content: "Need not wonder"
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      tasksIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      tasksIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      tasksIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};
