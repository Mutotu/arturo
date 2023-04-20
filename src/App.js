import { Route, Routes , Navigate} from "react-router-dom";
import Login from './Login'
import Template from './Template'
import Preview from "./Preview"
import './App.css';
import { selectData } from './store/userInput/userInputSlice'
import { useSelector } from "react-redux";

function App() {
  const selectedData = useSelector(selectData);
  const {isLoggedIn} = selectedData;
  return (
    <div className="App">
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/template" element={<Template />} />
            <Route path="/preview" element={<Preview />} />
          </>
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/" replace={true} />} // Redirect to login page if not logged in
          />
        )}
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
