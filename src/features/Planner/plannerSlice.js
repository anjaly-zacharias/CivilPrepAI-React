import { createSlice } from "@reduxjs/toolkit";
import { loadData } from "../../utils/storage";

const plannerSlice = createSlice({
  name: "planner",

  initialState: loadData("civilprep-planner", {
    schedules: [],
  }),

  reducers: {
    saveSchedule(state, action) {
      state.schedules.unshift(action.payload);
    },

    deleteSchedule(state, action) {
      state.schedules = state.schedules.filter(
        (schedule) => schedule.id !== action.payload
      );
    },
  },
});

export const {
  saveSchedule,
  deleteSchedule,
} = plannerSlice.actions;

export default plannerSlice.reducer;