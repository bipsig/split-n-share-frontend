import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/axiosInstance';
import { extractErrorMessage } from "../../api/errorHandler";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null 
};

export const loginUser = createAsyncThunk('auth/login', async(credentials, thunkAPI) => {
  try {
    const response = await axios.post('auth/login', credentials);

    if (!response.data.success) {
      return thunkAPI.rejectWithValue(response.data.message);
    }

    return response.data;
  }
  catch(err) {
    const message = extractErrorMessage(err);

    return thunkAPI.rejectWithValue(message);
  }
})

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