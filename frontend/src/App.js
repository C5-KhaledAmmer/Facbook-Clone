import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Login  } from './components/Login';
import { Register  } from './components/Register';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
   </Routes>
  );
}

export default App;
