import React from 'react';
import Input from './Components/Input';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateIsLoggedIn } from './store/userInput/userInputSlice'
import {  useDispatch } from "react-redux";
import { StyledButton, glowing, StyledError, StyledTitle, StyledForm, StyledContainer } from './Styles';
import { DEFAULT_VALUES, MOCKACCOUNT} from "./defaultData";


const Login = () => {
  const [userInfo, setUserInfo] = useState(DEFAULT_VALUES);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const checkInfo = ()=>{
    if (userInfo.username === MOCKACCOUNT.username && userInfo.password === MOCKACCOUNT.password) {
      dispatch(updateIsLoggedIn(true));
      return navigate('/template');
    } else {
      setErrorMessage("Incorrect Credentials");
      return;
    }
  }
  const handleClick = () => {
    checkInfo()
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkInfo()
  }}

  return (
    <StyledContainer onKeyDown={handleKeyDown}>
      <StyledForm>
        <StyledTitle>Enter Credentials</StyledTitle>
        <Input name={"username"} placeholder={'username'} label={'Username'} value={userInfo.username} type={"text"} onChange={handleChange} />
        <Input name={"password"} placeholder={'password'} label={'Password'} value={userInfo.password} type={"password"} onChange={handleChange} />
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
        <StyledButton onClick={handleClick} >Submit</StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

export default Login;