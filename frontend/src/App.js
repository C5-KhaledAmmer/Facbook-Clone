import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Login  } from './components/Login';
import { Register  } from './components/Register';
import { Homepage  } from './components/Homepage';
import './App.css';
import { Info } from "./controllers/info";
import { useEffect } from "react";

function App() {
  const navigate =useNavigate();
  useEffect(()=>{
    Info.isUserLogin(navigate);
  },[])
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
   </Routes>
  );
}

export default App;
