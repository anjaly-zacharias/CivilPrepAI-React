
import { configureStore } from "@reduxjs/toolkit";

import subjectReducer from "../features/subjects/subjectSlice";
import taskReducer from "../features/tasks/taskSlice";
import plannerReducer from "../features/planner/plannerSlice";

export const store = configureStore({
  reducer: {
    subjects: subjectReducer,
    tasks: taskReducer,
    planner: plannerReducer,
  },
});
