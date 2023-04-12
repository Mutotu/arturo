import React from 'react'
import Input from './Components/Input'
import {useState} from 'react';
import { useNavigate }from "react-router-dom";
import styled from 'styled-components'

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 2rem;
margin: 2rem;
& > * {
    margin: 0.5rem 0;
  }
`

const DEFAULT_VALUES = {username:'',password:''};
const MOCKACCOUNT = {username:"test", password:"123"};

const Login = ()=>{
    const [userInfo,setUserInfo]=useState(DEFAULT_VALUES);
    const [errorMessafe,setErrorMessage] = useState("")
    const navigate = useNavigate();

const handleChange = (e)=>{
    setUserInfo(pre=>({...pre, [e.target.name]:e.target.value}))
}
const handleClick=()=>{
    if(userInfo.username === MOCKACCOUNT.username 
        && userInfo.password === MOCKACCOUNT.password) {
            return navigate('/template')
        }else{ 
    setErrorMessage("Incorrect Credentials")
    return;
}
   
}

    return <>
        <h2 style={{"paddingTop":"4rem", "textDecoration": "underline"}}>Enter Credentials</h2>
        <StyledDiv>
        <Input name={"username"} placeholder={'username'} label={'Username'} value={userInfo.username} type={"text"} onChange={handleChange}/>
        <Input name={"password"} placeholder={'password'} label={'Password'} value={userInfo.password} type={"password"} onChange={handleChange}/>
        <h3 style={{"textDecoration": "underline", "color":"red"}}>{errorMessafe}</h3>
        <button onClick={handleClick} style={{"backgroundColor": "pink", "width": "6rem", "height":"2rem"}}>Submit</button>
        </StyledDiv>
    </>
}

export default Login;