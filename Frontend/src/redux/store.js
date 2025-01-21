import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../redux/projectSlice";


export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});
export default store;
