import { useSelector} from "react-redux";
import Stage from "./Components/Stage";
import { selectData } from './store/userInput/userInputSlice'
import { useNavigate } from 'react-router-dom';
import { getDayNameFromDate, getMonthNameFromDate } from "./helperFuncs"
import { updateIsLoggedIn, updateAll } from './store/userInput/userInputSlice'
import {  useDispatch } from "react-redux";

const Preview = () =>{
    const selectedData = useSelector(selectData)
    const {fName,time,location,date,natureOfDetails,attireAndGear, expenses, mileage, dailySummary, email} = selectedData;
    const dispatch = useDispatch();

    const headersAndInputs = [
        {"DATE & LOCATION": 
        getDayNameFromDate(date.year + "-" +  (Number(date.month) + 1<10? "0"+String(Number(date.month)+1 ): String(Number(date.month)+1))  + "-" + Number((date.day)<10?  "0" + date.day:date.day)) +
        ", "+
        getMonthNameFromDate(date.year + "-" +  (Number(date.month) + 1<10? "0"+String(Number(date.month)+1 ): String(Number(date.month)+1))  + "-" + Number((date.day)<10?  "0" + date.day:date.day)) 
        + " " + date.day + ", "
        + date.year
        +" - " + location},
        {"PROTECTOR & HOURS": Object.values(fName).join(" ") +": " +
        (Number(time.begHr) < 10 ? "0"+time.begHr: time.begHr) 
        + "" +(Number(time.begMin) < 10 ? "0"+time.begMin: time.begMin) 
        + "-" + 
        (Number(time.finishHr) < 10 ? "0"+time.finishHr: time.finishHr) 
        + "" +(Number(time.finishMin) < 10 ? "0"+time.finishMin: time.finishMin) 
    },
        {"NATURE OF DETAILS": natureOfDetails},
        {"ATTIRE & GEAR": attireAndGear},
        {"EXPENSES": expenses},
        {"MILEAGE": "Start of Shift: " + mileage.start +" // " + "End of Shift: "+mileage.end},
        {"DAILY SUMMARY": dailySummary},

    ]
    const navigate = useNavigate();

    const handleClick = () =>{

      const recipient = 'recipient@example.com'; 
      const subject = 'Connector - Patrol - ' + location; 
      const body = encodeURIComponent(headersAndInputs.map(obj => `${Object.keys(obj)[0]}: ${Object.values(obj)[0]}`).join('\n'));
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      dispatch(updateIsLoggedIn(false))
      navigate("/")
      dispatch(updateAll());
  }
    
    return <>
        {headersAndInputs.map(o => <Stage header={Object.keys(o)} rest={Object.values(o)} key={Object.keys(o)}/>)}
        <button onClick={()=>navigate("/template")}>Edit</button>
        <button onClick={handleClick}>Send</button>
          </>

}


export default Preview;