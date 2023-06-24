import React, { useState} from 'react';
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import Dropdown from './Components/DropDown';
import Input from './Components/Input';
import { useSelector, useDispatch } from "react-redux";
import {updateTime,selectData ,updateLocation, updateName,updateDate,updateNatureOfDetails,updateAttireAndGear, updateExpenses, updateMileage, updateDailySummary, updateTImeWorked, updateAnomalies, updateNotes, updateChangeOver,updateTakeOver} from './store/userInput/userInputSlice';
import TextArea from './Components/TextArea';
import { useNavigate } from 'react-router-dom';
import { StyledDiv,StyledDivided, styles, inputContainer} from './Styles';
import { locations, checkInMessage } from './defaultData';
import { initalContact, lastContact, getSubstring, arrMaker } from "./helperFuncs"

const Template = ()=>{
  const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedData = useSelector(selectData)
    const {fName,changeover,takeover,time,location,date,natureOfDetails,attireAndGear, expenses, mileage, dailySummary,anomalies, notes, timeWorked } = selectedData
    
    const [isError,setIsError]=useState({
      monthError:false,
      dayError:false,
      yearError:false,
      locationError:false,
      name:false,
      lastName: false,
      changeoverName: false,
      changeoverLastName: false,
      takeoverName: false,
      takeoverLastName: false,
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
    if(changeover.changeoverName === ""){
      setToTrue("changeoverName")
      setThereIsError(true);
      return true
    }
    if(changeover.changeoverLastName === ""){
      setToTrue("changeoverLastName")
      setThereIsError(true);
      return true
    }
    if(takeover.takeoverName === ""){
      setToTrue("takeoverName")
      setThereIsError(true);
      return true
    }
    if(takeover.takeoverLastName === ""){
      setToTrue("takeoverLastName")
      setThereIsError(true);
      return true
    }

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
    }
    setThereIsError(false);
    return false;
  }

const checkTimes = () =>{
  let hr = Number(time.begHr) 
  let finHr =  Number(time.finishHr)
  finHr = finHr > hr ? finHr - hr : finHr + (24 - hr);
  let times = [];

  times.push( hr - 1 < 10 ? "0"+ (hr -1 ) + "55: " + initalContact(changeover.changeoverName,changeover.changeoverLastName) : (hr -1 ) + "55: " + initalContact(changeover.changeoverName,changeover.changeoverLastName));
  for(let i = hr; i <= hr + finHr; i+=2){
      times.push(i > 24 ? "0" + (i % 24 === 0 ? "00" :  i % 24 )+ "00: ": (i % 24 === 0 ? "00" :  i % 24 ) + "00: " );
    }
  times.splice(2, 0, (hr < 10 ? "0"+ hr === 24 ? "00": hr + "05: Checked in/shared Glympse location with GSOC.": hr  + "05: Checked in/shared Glympse location with GSOC."));

  let subStr = getSubstring(times,times.length);
    times.splice(times.length - 1, 0, (subStr < 10 ? "0"+ String(subStr -1 )+ "55: " + lastContact(takeover.takeoverName, takeover.takeoverLastName): parseInt(times[times.length - 1].substring(0, 2)) - 1 + "55: " + lastContact(takeover.takeoverName, takeover.takeoverLastName)));
    for(let i=1; i < times.length - 1; i++) {
        times[i] = times[i] + checkInMessage;
    }
    let lastIndexToInsert =  Number(time.finishHr) < 10 ? "0"+ time.finishHr+ "00: "  + fName.name + " " + fName.lastName + " off shift" : time.finishHr+ "00: "  + fName.name + " " + fName.lastName + " off shift";
    times.splice(times.length - 1, 1, lastIndexToInsert);
    console.log(lastIndexToInsert)
    dispatch(updateDailySummary(times.join("\n\n")))

}

    const handleClick = ()=>{
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
      <h2>Changeover {star}</h2>
      <div style={inputContainer}>
      <Input className={isError.changeoverName ? "error" : ""} 
      label={"First Name"} name={"name"} value={changeover.changeoverName} placeholder={"Name"}
      className={isError.name ? "error" : ""}
      onChange={(e)=>{
          dispatch(updateChangeOver({key:"changeoverName",value:e.target.value}))
          setToFalse("changeoverName")
      }}
      />
      <Input 
        className={isError.changeoverLastName ? "error" : ""} 
        label={"Last Name"} name={"lastName"} value={changeover.changeoverLastName} placeholder={"Last Name"}
        className={isError.changeoverLastName ? "error" : ""}
      onChange={
          (e)=>{
              dispatch(updateChangeOver({key:"changeoverLastName",value:e.target.value}))
              setToFalse("changeoverLastName")
          }
      }
      />
      </div>
      </StyledDivided>

      <StyledDivided >

        <h2>TakeOver {star}</h2>
        <div style={inputContainer}>
        <Input className={isError.takeoverName ? "error" : ""} 
        label={"First Name"} name={"name"} value={takeover.takeoverName} placeholder={"Name"}
        className={isError.name ? "error" : ""}
        onChange={(e)=>{
            dispatch(updateTakeOver({key:"takeoverName",value:e.target.value}))
            setToFalse("takeoverName")
        }}
        />
        <Input 
          className={isError.takeoverLastName ? "error" : ""} 
          label={"Last Name"} name={"lastName"} value={takeover.takeoverLastName} placeholder={"Last Name"}
          className={isError.takeoverLastName ? "error" : ""}
        onChange={
            (e)=>{
                dispatch(updateTakeOver({key:"takeoverLastName",value:e.target.value}))
                setToFalse("takeoverLastName")
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
                  dispatch(updateTime({key:"begHr", value: hr}))
                  setToFalse("shiftTime"); 
              }
            } arr={arrMaker(25)}/>
          <Dropdown format={time.begMin} name={"begMin"} handleChange={(e)=> {
            dispatch(updateTime({key:"begMin", value: e.target.value === "0" ? "0" : e.target.value  }))
          }
          } 
          arr={arrMaker(60)}
          />
        </div>
        <div>
            <p>Finish:</p>
          <Dropdown format={time.finishHr} name={"finishHr"} handleChange={(e)=>
            {
              if(!Number(e.target.value)) return;
              dispatch(updateTime({key:"finishHr", value:e.target.value})) 
            }
          } arr={arrMaker(25)}/>
          <Dropdown format={time.finishMin} name={"finishMin"} handleChange={
              (e)=>{
                dispatch(updateTime({key:"finishMin", value: e.target.value === "0" ? "0" : e.target.value }))
                setToFalse("shiftTime");
                }   } 
              arr={arrMaker(60)}
          />
          
            {isError.shiftTime && <h3 style={{"textDecoration":"underline", "color":"red"}}>Finish time cannot be the same as begin time</h3>}
        </div>
        <button style={styles}  onClick = {checkTimes}>Check the times </button>
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
        <TextArea label={"ATTIRE & GEAR"} name={"attireAndGear"} value={attireAndGear} placeholder={"Approved Crisis24 field attire, approved Crisis24 gear, and medical bag minus 417.  "}
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
        onClick={() => setExpanded(true)
    }
        />
          </div>
        <button style={styles} onClick={handleClick}>Preview</button>
        </div>
    </StyledDiv>
}

export default Template;