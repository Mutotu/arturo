import styled from "styled-components";
import React from 'react'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const Label = styled.label`
  text-decoration: underline;
`;

const InputField = styled.input`
  height: 3rem;
  width: 15rem;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  border: ${(props) => props.error};
`;

const Input = ({name, label, value, placeholder, onChange, type, className}) => {
  return (
    <InputContainer>
      <Label>{label}:</Label>
      <InputField
        className={className}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        error= {className === "error" ? "4px solid red;" : ""}
        required
      />
    </InputContainer>
  );
}

export default Input;