import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Info, LocalStorage } from "../../controllers/info";
import { useNavigate } from "react-router-dom";
import { Registration } from "../../controllers/registration";


export const Login = () => {
  const createInput = ({ placeholder, setState, type = "text" }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            setState(e.target.value);
          }}
          className="input"
        />
      </div>
    );
  };
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  return (
    <div id="login-form">
      <div id="login-form-inner">
        {createInput({
          placeholder: "Email",
          type: "text",
          setState: setEmail,
        })}
        {createInput({
          placeholder: "Password",
          type: "password",
          setState: setPassword,
        })}
        <button onClick={()=>{
          Registration.login({navigate,email,password})
        }}>Login</button>
        <div id="login-response-div">{response}</div>
      </div>
    </div>
  );
};
