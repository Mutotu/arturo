const Dropdown = ({format,name,handleChange,arr}) =>{

    return <select value={format} name={name} onChange={handleChange}>
    {arr.map(o=><option  key={o} value={o}>{o}</option>)}
        </select>
}

export default Dropdown;