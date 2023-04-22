import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
      
      },
  });
  

export const {

  } = uiSlice.actions;
  export const selectUi = (state) => state.ui
  export default uiSlice.reducer;


