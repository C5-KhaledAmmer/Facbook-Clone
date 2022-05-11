import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Info, LocalStorage } from "../..";
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
  const login = () => {
    const user = {
      email,
      password,
    };
    axios
      .post("http://localhost:5000/login", user)
      .then((res) => {
        setResponse(res.data.message);
        LocalStorage.setItem({ key: "token", value: res.data.token });
        LocalStorage.setItem({ key: "userId", value: res.data.userId });
        Info.token = res.data.token;
        Info.userId = res.data.userId;
        Info.isLogin = true;
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

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
        <button onClick={login}>Login</button>
        <div id="login-response-div">{response}</div>
      </div>
    </div>
  );
};
