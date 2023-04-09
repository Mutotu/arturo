import { Route, Routes } from "react-router-dom";
import Login from './Login'
import Template from './Template'
import Preview from "./Preview"
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/template" element={<Template />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;
