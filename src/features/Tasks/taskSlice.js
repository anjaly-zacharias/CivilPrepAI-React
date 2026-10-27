import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadData } from "../../utils/storage";

const taskSlice = createSlice({
  name: "tasks",

  initialState: loadData("civilprep-tasks", []),

  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },

      prepare(task) {
        return {
          payload: {
            id: nanoid(),
            title: task.title,
            subjectId: task.subjectId,
            deadline: task.deadline,
            duration: Number(task.duration) || 60,
            priority: task.priority || "Medium",
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    updateTask(state, action) {
      const task = state.find(
        (item) => item.id === action.payload.id
      );

      if (task) {
        Object.assign(task, action.payload);
      }
    },

    toggleTask(state, action) {
      const task = state.find(
        (item) => item.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask(state, action) {
      return state.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const {
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;