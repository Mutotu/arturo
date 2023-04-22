import { configureStore } from "@reduxjs/toolkit";
import userInputReducer from "./userInput/userInputSlice";
import uiReducer from "./ui/uiSlice"

const store = configureStore({
  reducer: {
      userinput: userInputReducer,
      ui: uiReducer
},
});


export default store;
