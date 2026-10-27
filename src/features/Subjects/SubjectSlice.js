import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadData } from "../../utils/storage";

const defaultSubjects = [
  { id: "history", name: "History", color: "#8b5cf6" },
  { id: "polity", name: "Indian Polity", color: "#2563eb" },
  { id: "geography", name: "Geography", color: "#059669" },
  { id: "economy", name: "Indian Economy", color: "#ea580c" },
  { id: "environment", name: "Environment", color: "#16a34a" },
  { id: "csat", name: "CSAT", color: "#db2777" },
];

const subjectSlice = createSlice({
  name: "subjects",

  initialState: loadData("civilprep-subjects", defaultSubjects),

  reducers: {
    addSubject: {
      reducer(state, action) {
        state.push(action.payload);
      },

      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name,
            color: "#4f46e5",
          },
        };
      },
    },

    updateSubject(state, action) {
      const subject = state.find(
        (item) => item.id === action.payload.id
      );

      if (subject) {
        subject.name = action.payload.name;
      }
    },

    deleteSubject(state, action) {
      return state.filter(
        (subject) => subject.id !== action.payload
      );
    },
  },
});

export const {
  addSubject,
  updateSubject,
  deleteSubject,
} = subjectSlice.actions;

export default subjectSlice.reducer;
