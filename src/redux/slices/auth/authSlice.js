import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";


const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null 
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.message = action.payload.message;
        state.token = action.payload.data.accessToken
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.message = null;
        state.token = null;
      })
  }
});

export const authActions = authSlice.actions;
export default authSlice;