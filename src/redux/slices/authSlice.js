import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    login: (state) => {
      alert ('in Redux');
      state.user = 'sagnik'
    } 
  }
});

export const authActions = authSlice.actions;
export default authSlice;