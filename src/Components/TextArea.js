const TextArea = ({label, name, value, placeholder, onChange, readOnly,max, onClick}) =>{
    return <>
    <h3>{label}: </h3>
    <textarea 
    style={{"width": max ? "1000" : "500px", "height": max ? "5000px" : "200px", 
   "maxHeight" : max && "800px", "overflow": max && "hidden", fontSize: "20px"}}
    name={name} value={value} placeholder={placeholder}
     onChange={onChange} readOnly={readOnly}
     onClick={onClick}
     ></textarea>
    </>;
}

export default TextArea;