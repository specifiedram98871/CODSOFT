import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  project: [],
  loading: false,
  error: null,
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjectStarted: (state) => {
      state.loading = true;
    },
    setProjects: (state, action) => {
      state.project = action.payload;
      state.loading = false;
      state.error = null;
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
      query: () => "/project/projectList",
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: "/project/addproject",
        method: "POST",
        body: project,
      }),
    }),
    updateProject: builder.mutation({
      query: (project) => ({
        url: "/project/edit/" + project.id,
        method: "POST",
        body: project,
      }),
    }),
    deleteProject: builder.mutation({
      query: (project_id) => ({
        url: "/project/delete/" + project_id,
        method: "DELETE",
      }),
    }),
    assignProject: builder.mutation({
      query: (project_id, user) => ({
        url: "/project/assign" + project_id,
        mrthod: "POST",
        body:user
      })
    })
  }),
   
});

export const { useGetProjectsQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation,useAssignProjectMutation } = projectApi;

export const {
  setProjects,
  addProject,
  assignTask,
  trackProgress,
  updateSubtask,
} = projectSlice.actions;
export default projectSlice.reducer;
