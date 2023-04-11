import { useSelector} from "react-redux";
import Stage from "./Components/Stage";
import { selectData } from './store/userInput/userInputSlice'
import { useNavigate } from 'react-router-dom';
import { send } from "emailjs-com";

const Preview = () =>{
    const selectedData = useSelector(selectData)
    const {fName,time,location,date,natureOfDetails,attireAndGear, expenses, mileage, dailySummary} = selectedData;

    const headersAndInputs = [
        {"DATE & LOCATION": "date: " + Object.values(date).join(" ") 
         + "location: " + location},
        {"PROTECTOR & HOURS": Object.values(fName).join(" ") +": " +
       Object.values(time).join(" ")
    },
        {"NATURE OF DETAILS": natureOfDetails},
        {"ATTIRE & GEAR": attireAndGear},
        {"EXPENSES": expenses},
        {"MILEAGE": "Start of Shift: " + mileage.start +" // " + "End of Shift: "+mileage.end},
        {"DAILY SUMMARY": dailySummary},

    ]
    const navigate = useNavigate();

    const email = {name: "Muto lol ", email: "Will Smith", message:  headersAndInputs
    .map(obj => `${Object.keys(obj)[0]}: ${Object.values(obj)[0]}`)
    .join('\n')}

    const handleClick = () =>{

        send("service_sd4zejf", "template_taqw4qk",email, "V7R81jovIopTKNBx8")
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);

        })
        .catch((err) => {
          console.log("FAILED...", err);
        });
        alert("Your Rapport has been emailed")
        navigate("/")
    }
    
    return <>
        {headersAndInputs.map(o => <Stage header={Object.keys(o)} rest={Object.values(o)} key={Object.keys(o)}/>)}
        <button onClick={()=>navigate("/template")}>Edit</button>
        <button onClick={handleClick}>Send</button>
          </>

}

const TimeFormatter = (time)=>{

}

export default Preview;