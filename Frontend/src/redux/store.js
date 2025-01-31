import { configureStore } from "@reduxjs/toolkit";
import {userApi} from "../redux/userSlice";
import projectReducer from "../redux/projectSlice";
import userReducer from "../redux/userSlice";
import { projectApi } from "../redux/projectSlice";


export const store = configureStore({
  reducer: {
    project: projectReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,projectApi.middleware),
    
});
export default store;
