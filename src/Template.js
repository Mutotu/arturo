import React, { useState} from 'react'
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import Dropdown from './Components/DropDown';
import Input from './Components/Input'
import { useSelector, useDispatch } from "react-redux";
import {updateTime,selectData ,updateLocation, updateName,updateDate,updateNatureOfDetails,updateAttireAndGear, updateExpenses, updateMileage, updateDailySummary, updateTImeWorked} from './store/userInput/userInputSlice'
import TextArea from './Components/TextArea';
import { useNavigate } from 'react-router-dom';
import {StyledDiv,StyledDivided} from './Styles'


const styles = {
  
    backgroundColor: 'green',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  

};
const Template = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedData = useSelector(selectData)
    const {fName,time,location,date,natureOfDetails,attireAndGear, expenses, mileage, dailySummary} = selectedData
    const locations=["Pick your location","San Francisco","Oakland","Daly City"]
    
    const [isError,setIsError]=useState({
      monthError:false,
      dayError:false,
      yearError:false,
      locationError:false,
      name:false,
      lastName: false,
      shiftTime: false,
      validMile: false,
    })
    const [thereisError, setThereIsError] = useState(false)
const setToTrue = (bool) =>{
  setIsError(pre => ({...pre,[bool]: true}))
}
const setToFalse = (bool) =>{
  setIsError(pre => ({...pre,[bool]: false}))
}


  const errorHandler = ()=>{
    if (date.month === "") {
      setToTrue("monthError")
      setThereIsError(true);
      return true;
    }
    if (date.day === "") {
      setToTrue("dayError")
      setThereIsError(true);
      return true;
    }
    if (date.year === "") {
      setToTrue("yearError")
      setThereIsError(true);
      return true;
    }
    if(location.includes("Pick") || location === ""){
      setToTrue("locationError")
      setThereIsError(true);
      return true;
    }
    if(fName.name === ""){
      setToTrue("name")
      setThereIsError(true);
      return true
    }
    if(fName.lastName === ""){
      setToTrue("lastName")
      setThereIsError(true);
      return true
    }
    
    if(mileage.start ==="" || mileage.end === "" || Number(mileage.start > mileage.end)){
      setToTrue("validMile")
      return true;
    }

    if(Number(time.begHr) ===  Number(time.finishHr)){
      setToTrue("shiftTime")
      setThereIsError(true);
      return true
    }else{
      let hr =Math.abs(Number(time.begHr) -  Number(time.finishHr))
      let min =Math.abs(Number(time.begMin) -  Number(time.finishMin))
      dispatch(updateTImeWorked(`${hr}.${min}`))
    }
    setThereIsError(false);
    return false;
  }
    const handleClick = ()=>{

       if(!errorHandler()) navigate("/preview")
       else  alert("You have missing data. Scroll up, please")
    }
    console.log(thereisError)
    return <StyledDiv>
      <StyledDivided >
        <h3>Connector - Patrol {!location.includes("location") && location? " - "+location: ""}</h3>
        <h2>DATE & LOCATION:</h2>
        <MonthPicker
        defaultValue={"MM"}
        numeric 
        endYearGiven 
        year={date.year} 
        value={date.month} 
        onChange={(month) => {
            dispatch(updateDate({key:"month",value:month}))
            setToFalse("monthError")
            }}
        id={"month"}
        classes={`dropdown ${isError.monthError ? "error" : ""}`}
        optionClasses={"option"}
      />
      <DayPicker
        defaultValue={"DD"}
        year={date.year} 
        month={date.month} 
        endYearGiven 
        value={date.day} 
        onChange={(day) => {
        dispatch(updateDate({key:"day",value:day}))
        setToFalse("dayError")
        }}
        id={"day"}
        classes={`dropdown ${isError.dayError ? "error" : ""}`}
        optionClasses={"option"}
      />

      <YearPicker
        defaultValue={"YYYY"}
        start={2023} 
        end={2023} 
        reverse 
        value={date.year} 
        onChange={(year) => {
            dispatch(updateDate({key:"year",value:year}))
            setToFalse("yearError")
            }}
        id={"year"}
        classes={`dropdown ${isError.yearError ? "error" : ""}`}
        optionClasses={"option"}
      />
      <div style={{"marginTop":"5px"}}   >
        <select value={selectedData.location} onChange={(e)=>{
          dispatch(updateLocation(e.target.value))
          setToFalse("locationError") }
          }
          className={`dropdown ${isError.locationError ? "error" : ""}`}
         >
            {locations.map(l=><option  key={l} value={l}>{l}</option>)}
        </select>
        </div>
      </StyledDivided>
      
        <StyledDivided >

        <h2>PROTECTOR & HOURS</h2>
        <div style={{"display":"flex", "flexDirection":"column", "alignItems":"center", "justifyContent":"center"}}>
        <Input className={isError.name ? "error" : ""} 
         label={"First Name"} name={"name"} value={fName.name} placeholder={"Name"}
         className={isError.name ? "error" : ""}
        onChange={(e)=>{
            dispatch(updateName({key:"name",value:e.target.value}))
            setToFalse("name")
        }}
        />
         <Input 
          className={isError.lastName ? "error" : ""} 
          label={"Last Name"} name={"lastName"} value={fName.lastName} placeholder={"Last Name"}
          className={isError.lastName ? "error" : ""}
        onChange={
            (e)=>{
                dispatch(updateName({key:"lastName",value:e.target.value}))
                setToFalse("lastName")
            }
        }
        />
        </div>

        </StyledDivided>
        <StyledDivided >
          <div>
            <h2>Shift start time</h2>
            <p>Begin:</p>
            <Dropdown format={time.begHr} name={"begHr"} handleChange={(e)=>
                { dispatch(updateTime({key:"begHr", value:e.target.value}))
                setToFalse("shiftTime");}
              
            } arr={new Array(24)
            .join().split(',').map(function(item, index){
              return ++index;
              })}/>
          <Dropdown format={time.begMin} name={"begMin"} handleChange={(e)=>
                dispatch(updateTime({key:"begMin", value:e.target.value}))
          } arr={new Array(61).join().split(',').map(function(item, index) { 
            return index;
          })}
          />
        </div>

        <div>
            <p>Finish:</p>
          <Dropdown format={time.finishHr} name={"finishHr"} handleChange={(e)=>
               dispatch(updateTime({key:"finishHr", value:e.target.value})) 
          } arr={new Array(24)
            .join().split(',').map(function(item, index){ return ++index;})}/>
          <Dropdown format={time.finishMin} name={"finishMin"} handleChange={
              (e)=>
              {dispatch(updateTime({key:"finishMin", value:e.target.value}))
              setToFalse("shiftTime");}
          } arr={new Array(61).join().split(',').map(function(item, index) { 
            return index;
          })}
          />
            {isError.shiftTime && <h3 style={{"textDecoration":"underline", "color":"red"}}>Finish time cannot be the same as begin time</h3>}
        </div>
        </StyledDivided>
        <StyledDivided>
          <TextArea label={"NATURE OF DETAILS"} name={"natureOfDetails"} value={natureOfDetails} placeholder={"Nature of Details"}
        onChange={(e)=>{
            dispatch(updateNatureOfDetails(e.target.value))
        }}
        />
        </StyledDivided>
        <StyledDivided>
        <TextArea label={"ATTIRE & GEAR"} name={"attireAndGear"} value={attireAndGear} placeholder={"Attire and Gear"}
        onChange={(e)=>{
            dispatch(updateAttireAndGear(e.target.value))
        }}
        />
        </StyledDivided>
        <StyledDivided>
        <TextArea label={"EXPENSES"} name={"expenses"} value={expenses} placeholder={"Expenses"}
        onChange={(e)=>{
            dispatch(updateExpenses(e.target.value))
        }}
        />
      </StyledDivided>
      <StyledDivided>
        <h2>Mileage</h2>
        <div style={{"display":"flex", "flexDirection":"column", "alignItems":"center", "justifyContent":"center"}}>
        <Input label={"Start of Shift"} name={"start"} value={mileage.start} placeholder={"Start of shift"}
        onChange={
            (e)=>{dispatch(updateMileage({key:"start",value:e.target.value}))}
        }
        className={isError.validMile ? "error" : ""}
        />      
          <Input label={"End of Shift"} name={"end"} value={mileage.end} placeholder={"End of Shift"}
        onChange={(e)=>{dispatch(updateMileage({key:"end",value:e.target.value}))}
        }
        />
       
        </div>
     
        </StyledDivided>
        <div>
          <div>
          <TextArea label={"DAILY SUMMARY"} name={"dailySummary"} value={dailySummary} placeholder={"Daily Summary"}
        onChange={(e)=>{
            dispatch(updateDailySummary(e.target.value))
        }}
        />
          </div>
        <button 
        style={styles}
        onClick={handleClick}>Preview</button>
        </div>
      
    </StyledDiv>
}

export default Template;