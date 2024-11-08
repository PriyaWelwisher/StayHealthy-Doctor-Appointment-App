import { createSlice } from "@reduxjs/toolkit";
export const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: true,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

const { showLoading, hideLoading } = alertSlice.actions;
