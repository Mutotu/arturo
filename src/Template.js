import React, { useState} from 'react';
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import Dropdown from './Components/DropDown';
import Input from './Components/Input';
import { useSelector, useDispatch } from "react-redux";
import {updateTime,selectData ,updateLocation, updateName,updateDate,updateNatureOfDetails,updateAttireAndGear, updateExpenses, updateMileage, updateDailySummary, updateTImeWorked, updateAnomalies, updateNotes, updateEmail} from './store/userInput/userInputSlice';
import TextArea from './Components/TextArea';
import { useNavigate } from 'react-router-dom';
import { StyledDiv,StyledDivided, styles, inputContainer} from './Styles';
import { locations } from './defaultData';



const Template = ()=>{
  const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedData = useSelector(selectData)
    const {fName,time,location,date,natureOfDetails,attireAndGear, expenses, mileage, dailySummary,anomalies, notes, email} = selectedData
    
    const [isError,setIsError]=useState({
      monthError:false,
      dayError:false,
      yearError:false,
      locationError:false,
      name:false,
      lastName: false,
      shiftTime: false,
      validMile: false,
      isEmail: false,
      isNatureOfDetails: false,
      isAttireAndGear: false,
      isDailySummary: false
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
    
    // if(natureOfDetails === ""){
    //   setToTrue("isNatureOfDetails")
    //   setThereIsError(true);
    //   return true
    // }
    // if(attireAndGear === ""){
    //   setToTrue("isAttireAndGear")
    //   setThereIsError(true);
    //   return true
    // }
  
    if(mileage.start ==="" || mileage.end === "" || Number(mileage.start > mileage.end)){
      setToTrue("validMile")
      return true;
    }else{
      updateMileage({key:"start",value: Math.abs(Number(mileage.start))})
      updateMileage({key:"end",value: Math.abs(Number(mileage.end))})
    }
    if(dailySummary === ""){
      setToTrue("isDailySummary")
      setThereIsError(true);
      return true
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
      console.log(dailySummary.split(/(\d.*?:)/g))
      if(!errorHandler()) navigate("/preview")
      else  alert("You have missing data. Scroll up, please")
    }
    const star = <span style={{"color": "red", "fontSize": "3rem"}}>*</span>
    const mandotoryInput = <p style={{
      "color": 'red',
      "fontWeight": 'bold',
      "fontSize": '16px',
      "textAlign": 'center',
      "backgroundColor": 'yellow',
      "padding": '10px'
    }}>Your input is needed where <span style={{"fontSize":"2rem"}}>*</span> is</p>
   
    return <StyledDiv>
      {mandotoryInput}
      <StyledDivided >
        <h3>Connector - Patrol Report{!location.includes("location") && location? " - "+location: ""}</h3>
        <h2>DATE & LOCATION: {star}</h2>
        <MonthPicker
        defaultValue={"Month"}
        // numeric 
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
        defaultValue={"Day"}
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
        defaultValue={"Year"}
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

        <h2>PROTECTOR & HOURS {star}</h2>
        <div style={inputContainer}>
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
            <h2>Shift time {star}</h2>
            <p>Begin:</p>
            <Dropdown format={time.begHr} name={"begHr"} handleChange={(e)=>
                { 
                if(!Number(e.target.value)) return;
                let hr = Math.abs(Number(e.target.value));
                let times = [];
                times.push( hr - 1 < 10 ? "0"+ (hr -1 ) + "55: ": (hr -1 ) + "55: ");
                for(let i = hr; i <= hr + 8; i ++ ){
                    times.push(i < 10 ? "0"+ i  + "00: ": i  + "00: ");
                  }
                  times.splice(2, 0, (hr -1  < 10 ? "0"+ hr  + "05: ": hr - 1 + "05: "));
                dispatch(updateTime({key:"begHr", value: hr}))
                setToFalse("shiftTime");
                dispatch(updateDailySummary(times.join("\n\n\n")))
              }
              
            } arr={new Array(25).join().split(',').map(function(item, index){
              return (index === 0) ? 0 : index++;
              })}/>
          <Dropdown format={time.begMin} name={"begMin"} handleChange={(e)=> {
            if(!Number(e.target.value)) return;
            dispatch(updateTime({key:"begMin", value:e.target.value}))
          }
          } 
          arr={new Array(60).join().split(',').map(function(item, index) { 
            return (index === 0) ? 0 : index++;
          })}
          />
        </div>

        <div>
            <p>Finish:</p>
          <Dropdown format={time.finishHr} name={"finishHr"} handleChange={(e)=>
            {
              if(!Number(e.target.value)) return;
              dispatch(updateTime({key:"finishHr", value:e.target.value})) }
          } arr={new Array(25)
            .join().split(',').map(function(item, index){  return (index === 0) ? 0 : index++;})}/>
          <Dropdown format={time.finishMin} name={"finishMin"} handleChange={
              (e)=>
              {
                if(!Number(e.target.value)) return;
                dispatch(updateTime({key:"finishMin", value:e.target.value}))
              setToFalse("shiftTime");}
          } 
          arr={new Array(60).join().split(',').map(function(item, index) { 
            return (index === 0) ? 0 : index++;
          })}
          />
            {isError.shiftTime && <h3 style={{"textDecoration":"underline", "color":"red"}}>Finish time cannot be the same as begin time</h3>}
        </div>
        </StyledDivided>
        <StyledDivided>
          <TextArea label={"NATURE OF DETAILS"} name={"natureOfDetails"} value={natureOfDetails} placeholder={"Provide agile response and security support for key Members of Leadership for Connector. "}
          readOnly="readOnly"
        onChange={(e)=>{
            dispatch(updateNatureOfDetails(e.target.value))
        }}
        />
        </StyledDivided>
        <StyledDivided>
        <TextArea label={"ATTIRE & GEAR"} name={"attireAndGear"} value={attireAndGear} placeholder={"N/A"}
        onChange={(e)=>{
            dispatch(updateAttireAndGear(e.target.value))
        }}
        />
        </StyledDivided>
        <StyledDivided>
        <TextArea label={"ANOMALIES"} name={"anomalies"} value={anomalies} placeholder={"N/A"}
        onChange={(e)=>{
            dispatch(updateAnomalies(e.target.value))
        }}
        />
        </StyledDivided> <StyledDivided>
        <TextArea label={"NOTES"} name={"notes"} value={notes} placeholder={"N/A"}
        onChange={(e)=>{
            dispatch(updateNotes(e.target.value))
        }}
        />
        </StyledDivided>
        <StyledDivided>
        <TextArea label={"EXPENSES"} name={"expenses"} value={expenses} placeholder={"None"}
        onChange={(e)=>{
            dispatch(updateExpenses(e.target.value))
        }}
        />
      </StyledDivided>
      <StyledDivided>
        <h2>Mileage {star}</h2>
        <div style={{"display":"flex", "flexDirection":"column", "alignItems":"center", "justifyContent":"center"}}>
        <Input label={"Start of Shift"} name={"start"} value={mileage.start} placeholder={"Start of shift"} 
        onChange={
            (e)=>{
              let trimmed =""
              if(!Number(e.target.value)) trimmed = ""
              else trimmed = e.target.value;
              dispatch(updateMileage({key:"start",value: trimmed }))
          }
        }
        className={isError.validMile ? "error" : ""}
        />      
          <Input label={"End of Shift"} name={"end"} value={mileage.end} placeholder={"End of Shift"} 
        onChange={(e)=>{
          let trimmed =""
          if(!Number(e.target.value)) trimmed = ""
          else trimmed = e.target.value;
          dispatch(updateMileage({key:"end",value: trimmed }))
        }
        }
        />

        </div>     
        </StyledDivided>
        <div>
          <div>
          <TextArea label={"DAILY SUMMARY"} name={"dailySummary"} value={dailySummary} placeholder={"Daily Summary"} max={expanded}
        onChange={ (e)=>{
          dispatch(updateDailySummary(e.target.value))
        }
      } 
        onClick={() => {
          setExpanded(true)
    }
    }
        />
          </div>
        <button style={styles} onClick={handleClick}>Preview</button>
        </div>
    </StyledDiv>
}

export default Template;