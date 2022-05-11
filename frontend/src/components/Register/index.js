import React, { useState } from "react";
import axios from "axios";
import "./style.css";
export const Register = () => {
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
  const register = () => {
    const user = {
      userName: firstName + lastName,
      birthDate: Date.now(),
      age,
      country,
      email,
      password,
    };
    axios
      .post("http://localhost:5000/users", user)
      .then((res) => {
        setResponse(res.data.message);
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  return (
    <div id="signup-form">
      <div id="signup-form-inner">
        {createInput({
          placeholder: "First Name",
          type: "text",
          setState: setFirstName,
        })}
        {createInput({
          placeholder: "Last Name",
          type: "text",
          setState: setLastName,
        })}
        {createInput({ placeholder: "Age", type: "number", setState: setAge })}
        {createInput({
          placeholder: "Country",
          type: "text",
          setState: setCountry,
        })}
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
        <button onClick={register}>Register</button>
        <div id="register-response-div">{response}</div>
      </div>
    </div>
  );
};
