import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";


const initialState = {
  token: null,
  isAuthenticated: false,
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
        }
      )
  },
});

export const authActions = authSlice.actions;
export default authSlice;