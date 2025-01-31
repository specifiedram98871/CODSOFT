import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const projectSlice = createSlice({
  name: "project",
  initialState: [],
  reducers: {
    setProjects: (state, action) => {
      return action.payload; // Replaces the current state with fetched projects
    },
    addProject: (state, action) => {
      state.push(action.payload); // Adds a new project
    },
    assignTask: (state, action) => {
      const { project_id, subtask_id, updates } = action.payload;
      const project = state.find((p) => p.id === project_id);
      if (project) {
        const subtask = project.subtasks.find((st) => st.id === subtask_id);
        if (subtask) {
          Object.assign(subtask, updates);
        }
      }
    },
    trackProgress: (state, action) => {
      const { project_id } = action.payload;
      const project = state.find((p) => p.id === project_id);
      if (project && project.subtasks.length) {
        const completedTasks = project.subtasks.filter(
          (st) => st.status === "completed"
        ).length;
        project.progress = (completedTasks / project.subtasks.length) * 100;
      }
    },
    updateSubtask: (state, action) => {
      const { project_id, subtask_id, field, value } = action.payload;
      const project = state.find((p) => p.id === project_id);
      if (project) {
        const subtask = project.subtasks.find((st) => st.id === subtask_id);
        if (subtask) subtask[field] = value;
      }
    },
    removeProject: (state, action) => {
      const { project_id } = action.payload;
      return state.filter((p) => p.id !== project_id);
    },
  },
});

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/todos",
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;

export const {
  setProjects,
  addProject,
  assignTask,
  trackProgress,
  updateSubtask,
} = projectSlice.actions;
export default projectSlice.reducer;
