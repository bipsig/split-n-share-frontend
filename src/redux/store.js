import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import userSlice from "./slices/user/userSlice";
import { apiSlice } from "./slices/api/apiSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        }).concat(apiSlice.middleware)
    }
});

export default store;