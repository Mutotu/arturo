import { headerStyle, restStyle,StyledDiv,StyledDivided} from "../Styles";

const Stage = ({header, rest}) => {
console.log(header === "DAILY SUMMARY" )
    return (
        <StyledDiv>
            <StyledDivided >
            <h2 style={headerStyle}>{header}</h2>
           <h4  style={restStyle}>{rest[0] === "" ? "N/A" : rest}</h4>
            </StyledDivided>
        </StyledDiv>
    );
};

export default Stage;