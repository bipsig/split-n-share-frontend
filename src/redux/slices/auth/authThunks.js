import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../../api/errorHandler";
import axios from '../../../api/axiosInstance';

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
});