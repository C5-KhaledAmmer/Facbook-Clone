import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Login  } from './components/Login';
import { Register  } from './components/Register';
import { Homepage  } from './components/Homepage';
import { WelcomePage  } from './components/WelcomePage';
import {SuggestionsFriend } from './components/SuggestionsFriend';
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
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/s" element={<SuggestionsFriend />} />
   </Routes>
  );
}

export default App;
