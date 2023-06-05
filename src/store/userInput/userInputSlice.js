import {  createSlice } from "@reduxjs/toolkit";
import {capitalLetter} from '../../helperFuncs'

const initialState = {
fName: { name:"", lastName:"" },
changeover: { changeoverName: "", changeoverLastName: "" },
takeover: { takeoverName: "", takeoverLastName: "" },
type:'',
location:"",
date:{ year: "", month: "", day: "" },
time:{begHr: 0, begMin: 0,  finishHr:"", finishMin:"0" }, 
calcTime:0.0,
natureOfDetails:"",
attireAndGear:"",
expenses:"",
mileage: {start:"", end:""},
dailySummary:"",
timeWorked:"",
isLoggedIn: false,
email:"",
anomalies: "",
notes: "",
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
        updateChangeOver:(state,action)=>{
            state.changeover[action.payload.key] = capitalLetter(action.payload.value)
        },
        updateTakeOver:(state,action)=>{
            state.takeover[action.payload.key] = capitalLetter(action.payload.value)
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
            state.mileage[action.payload.key] = action.payload.value > 0 ? action.payload.value :  action.payload.value;
        },
        updateDailySummary:(state,action) => {
            state.dailySummary =  action.payload;
        },
        updateTImeWorked:(state,action) =>{
            state.timeWorked = action.payload;
        },
        updateIsLoggedIn:(state, action) =>{
            state.isLoggedIn = action.payload;
        },
        updateEmail:(state,action) => {
            state.email = action.payload;
        },
        updateAll:(state)=>{
            return initialState;
        },
        updateAnomalies:(state,action) => {
            state.anomalies = action.payload;
        },
        updateNotes: (state, action) => {
            state.notes = action.payload;
      }
    }
  });
  

export const {
    updateTime,updateLocation,updateName,updateDate, updateNatureOfDetails,updateAttireAndGear, updateExpenses, updateMileage, updateDailySummary,updateTImeWorked, updateIsLoggedIn, updateEmail, updateAll, updateAnomalies, updateNotes, updateChangeOver,updateTakeOver
  } = userInputSlice.actions;
  export const selectData = (state) => state.userinput
  export default userInputSlice.reducer;

