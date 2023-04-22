import styled,  { keyframes } from 'styled-components';

export const StyledDiv = styled.div`
display: flex;
flex-direction: column;
`

export const StyledDivided = styled.div`
padding: 1rem;
margin: 1rem;
&:nth-child(odd) {
    background-color: #f0f0f0;
  }
`

export const styles = {
  
    backgroundColor: 'green',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',

};

export const StyledContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`;

export const StyledForm = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 600px;
padding: 2rem;
background-color: #f8f8f8;
border-radius: 10px;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

export const StyledTitle = styled.h2`
margin-top: 0;
text-decoration: underline;
`;

export const StyledError = styled.h3`
margin-top: 0.5rem;
text-decoration: underline;
color: red;
`;

export const glowing = keyframes`
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

export const StyledButton = styled.button`
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

export const stageContainerStyle = {
    borderBottom: "1px solid black",
    paddingBottom: "10px", 
    marginBottom: "20px" 
    
};


export const headerStyle = {
    textDecoration: "underline",
    fontSize: "18px", 
    margin: "10px" 
};

export const restStyle = {
    fontSize: "16px", 
    margin: "5px" 
};



export const inputContainer = { "display":"flex", "flexDirection":"column", "alignItems":"center", "justifyContent":"center" };