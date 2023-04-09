const TextArea = ({label, name, value, placeholder, onChange}) =>{
    return <>
    <h3>{label}: </h3>
    <textarea style={{"width":"300px", "height":"100px"}} name={name} value={value} placeholder={placeholder} onChange={onChange}></textarea>
    </>;
}

export default TextArea;