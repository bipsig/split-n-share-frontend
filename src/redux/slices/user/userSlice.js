import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
// import axios from '../../../api/axiosInstance';

const initialState = {
    userData: {
        username: null
    },
};


const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.
            addMatcher(
                usersApi.endpoints.getUserDetails.matchFulfilled, (state, action) => {
                    state.userData = action.payload.user;
                }
            )
    }
});

export const userActions = userSlice.actions;
export default userSlice;