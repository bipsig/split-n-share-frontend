import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import userSlice from "./slices/user/userSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;