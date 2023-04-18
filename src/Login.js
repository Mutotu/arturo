import React from 'react';
import Input from './Components/Input';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  text-decoration: underline;
`;

const StyledError = styled.h3`
  margin-top: 0.5rem;
  text-decoration: underline;
  color: red;
`;

const glowing = keyframes`
  0% {
    box-shadow: 0 0 5px #ff00e5;
  }
  50% {
    box-shadow: 0 0 20px #ff00e5, 0 0 30px #ff00e5, 0 0 40px #ff00e5, 0 0 50px #ff00e5;
  }
  100% {
    box-shadow: 0 0 5px #ff00e5;
  }
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  background-color: pink;
  color: #fff;
  border: none;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #ff00e5;
    box-shadow: 0px 0px 10px rgba(255, 0, 229, 0.7);
    animation: ${glowing} 2s infinite;
  }
`;

const DEFAULT_VALUES = { username: '', password: '' };
const MOCKACCOUNT = { username: "test", password: "123" };

const Login = () => {
  const [userInfo, setUserInfo] = useState(DEFAULT_VALUES);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = () => {
    if (userInfo.username === MOCKACCOUNT.username && userInfo.password === MOCKACCOUNT.password) {
      return navigate('/template');
    } else {
      setErrorMessage("Incorrect Credentials");
      return;
    }
  }

  return (
    <StyledContainer>
      <StyledForm>
        <StyledTitle>Enter Credentials</StyledTitle>
        <Input name={"username"} placeholder={'username'} label={'Username'} value={userInfo.username} type={"text"} onChange={handleChange} />
        <Input name={"password"} placeholder={'password'} label={'Password'} value={userInfo.password} type={"password"} onChange={handleChange} />
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
        <StyledButton onClick={handleClick}>Submit</StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

export default Login;