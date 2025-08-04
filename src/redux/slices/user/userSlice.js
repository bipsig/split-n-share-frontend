import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../api/axiosInstance';

const initialState = {
    data: null,
    loading: null,
    error: null,
    username: null,
    token: null,
    userData: null
};

// export const loginUser = createAsyncThunk('user/login', async (formData, thunkAPI) => {
//     try {
//         const response = await axios.post(`auth/login`, formData);
//         return response.data;
//     }
//     catch (err) {
//         return thunkAPI.rejectWithValue(err.response.data);
//     }
// });

// export const getUserDetails = createAsyncThunk('user/details', async (token, thunkAPI) => {
//     try {
//         const response = await axios.get(`users/me`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data.data.user;
//     }
//     catch (err) {
//         return thunkAPI.rejectWithValue(err.response.data);
//     }
// })

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        handleLogout: (state, action) => {
            return initialState
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginUser.pending, (state) => {
    //             state.loading = true
    //             state.data = null;
    //         })
    //         .addCase(loginUser.fulfilled, (state, action) => {
    //             state.loading = false
    //             state.data = action.payload;
    //         })
    //         .addCase(loginUser.rejected, (state, action) => {
    //             state.loading = false
    //             state.error = action.payload;
    //         })
    //     builder
    //         .addCase(getUserDetails.pending, (state) => {
    //             state.loading = true
    //             state.userData = null;
    //         })
    //         .addCase(getUserDetails.fulfilled, (state, action) => {
    //             state.loading = false
    //             state.userData = action.payload;
    //         })
    //         .addCase(getUserDetails.rejected, (state, action) => {
    //             state.loading = false
    //             state.error = action.payload;
    //         })
    // }
});

export const userActions = userSlice.actions;
export default userSlice;