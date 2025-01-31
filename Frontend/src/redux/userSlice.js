import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    logInUser:builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
    }),
    SignInUser: builder.mutation({
      query: (user) => ({
        url: "/user/register",
        method: "POST",
        body: user,
      })
    }),
    getUser: builder.query({
      query: () => "/todos",
    }),
    getAllUser: builder.query({
      query: () => "/user/getUsers",
    }),
    //user
    logUser: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
      
    }),
    loadUser: builder.query({
      query: () => "/user/me",
      
    })
  }),
});

export const { setUser, updateUser, setLoading, logout } = userSlice.actions;
export default userSlice.reducer;
export const { useLogInUserMutation,useGetUserQuery, useGetAllUserQuery, useLogUserMutation,useLoadUserQuery } =
  userApi;


