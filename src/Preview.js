import { useSelector} from "react-redux";
import Stage from "./Components/Stage";
import { selectData } from './store/userInput/userInputSlice'
import { useNavigate } from 'react-router-dom';
import { getDayNameFromDate, getMonthNameFromDate } from "./helperFuncs"
import { updateAll } from './store/userInput/userInputSlice'
import {  useDispatch } from "react-redux";

const Preview = () =>{
    const selectedData = useSelector(selectData)
    const {fName,time,location,date,natureOfDetails,attireAndGear, expenses, mileage, dailySummary, email} = selectedData;
    const dispatch = useDispatch();
    const {year, month, day} = date;
    const numberedMonth = Number(month);

    const headersAndInputs = [
        {"DATE & LOCATION": 
        getDayNameFromDate(year + "-" +  (numberedMonth + 1 < 10 ? "0" + String(Number(month)+1 ): String(Number(month)+1))  + "-" + Number((day)<10?  "0" + day:day)) +
        ", "+
        getMonthNameFromDate(year + "-" +  (numberedMonth + 1 < 10 ? "0" + String(Number(month)+1 ): String(Number(month)+1))  + "-" + Number((day)<10?  "0" + day:day)) 
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
        {"ATTIRE & GEAR": attireAndGear },
        {"EXPENSES": expenses ? expenses : "None"},
        {"MILEAGE": "Start of Shift: " + mileage.start +" // " + "End of Shift: "+mileage.end},
        {"DAILY SUMMARY": dailySummary },

    ]

    const navigate = useNavigate();

    const handleClick = () =>{

    const recipient = 'recipient@example.com'; 
    const subject = 'Connector - Patrol - ' + location; 
    const body = encodeURIComponent(headersAndInputs.map((obj, index) => {
        const header = Object.keys(obj)[0];
        const value = Object.values(obj)[0];
        return index === 0 ? `${header}:\n${value}` : `\n\n${header}:\n${value}`;
    }).join(''));
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    dispatch(updateAll());
    navigate("/")
 
}
    
    return <>
        {headersAndInputs.map(o => <Stage header={Object.keys(o)} rest={Object.values(o)} key={Object.keys(o)}/>)}
        <div>
        <button style={{"width":"3.5rem", "height":"1.5rem", "margin":"3px", "fontSize":"1.2rem"}}onClick={()=>navigate("/template")}>Edit</button>
        <button style={{"width":"3.5rem", "height":"1.5rem",  "margin":"3px", "fontSize":"1.2rem"}} onClick={handleClick}>Send</button>
        </div>
        </>

}


export default Preview;