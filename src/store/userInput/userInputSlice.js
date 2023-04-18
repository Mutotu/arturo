import {  createSlice } from "@reduxjs/toolkit";
import {capitalLetter} from '../../helperFuncs'

const initialState = {
fName:{name:"",lastName:""},
type:'',
location:"",
date:{ year: "", month: "", day: "" },
time:{begHr:"", begMin:"0",  finishHr:"", finishMin:"0" }, 
calcTime:0.0,
natureOfDetails:"",
attireAndGear:"",
expenses:"",
mileage: {start:"", end:""},
dailySummary:"",
timeWorked:""
}

export const userInputSlice = createSlice({
    name: "userinput",
    initialState,
    reducers: {
        updateTime:(state,action)=>{
        state.time[action.payload.key] = action.payload.value
        },
        updateLocation:(state,action)=>{
            state.location = action.payload
        },
        updateName:(state,action)=>{
            state.fName[action.payload.key] = capitalLetter(action.payload.value)
        },
        updateDate:(state,action)=>{
            state.date[action.payload.key]=action.payload.value
        },
        updateNatureOfDetails:(state,action)=>{
            state.natureOfDetails = action.payload;
        },
        updateAttireAndGear:(state,action) => {
            state.attireAndGear = action.payload;
        },
        updateExpenses:(state,action) => {
            state.expenses = action.payload;
        },
        updateMileage:(state,action) => {
            state.mileage[action.payload.key] = action.payload.value;
        },
        updateDailySummary:(state,action) => {
            state.dailySummary =  action.payload;
        },
        updateTImeWorked:(state,action) =>{
            state.timeWorked = action.payload;
        }
      },
  });
  

export const {
    updateTime,updateLocation,updateName,updateDate, updateNatureOfDetails,updateAttireAndGear, updateExpenses, updateMileage, updateDailySummary,updateTImeWorked
  } = userInputSlice.actions;
  export const selectData = (state) => state.userinput
  export default userInputSlice.reducer;
