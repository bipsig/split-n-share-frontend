import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { usersApi } from "../api/usersApi";

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled, (state, action) => {
          const { data } = action.payload;
          state.token = data.accessToken;
          state.isAuthenticated = true;

          localStorage.setItem('token', data.accessToken);
        }
      )
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled, (state, action) => {
          state.token = null,
          state.isAuthenticated = false

          localStorage.removeItem('token');
        }
      )
      .addMatcher(
        usersApi.endpoints.updateUserDetails.matchFulfilled, (state, action) => {
          const { accessToken } = action.payload;
          
          if (accessToken) {
            state.token = accessToken;
            state.isAuthenticated = true;
          }
        }
      )
  },
});

export const authActions = authSlice.actions;
export default authSlice;