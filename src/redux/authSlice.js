import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
