import styled from "styled-components";
import React from 'react'


const Input = ({name,label,value,placeholder,onChange,type,className})=>{
        return <>
            <label style={{"textDecoration": "underline","display":"flex", "flexDirection": "column","marginBottom": "5px"}}>{label}: </label>
            <input className={className} style={{"height":"2rem", "width": "10rem"}} type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} required></input>
            </>
}

export default Input;


