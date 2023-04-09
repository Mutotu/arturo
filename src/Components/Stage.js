const Stage = ({header,rest}) =>{

    return <div style={{"borderBottom":"1px solid black"}}>
        <h2 style={{"textDecoration":"underline"}}>{header}</h2>
        <h4>{rest[0] === "" ? "N/A" : rest}</h4>
           </div>

}

export default Stage;