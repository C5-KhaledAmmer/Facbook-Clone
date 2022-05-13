import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Registration } from "../../controllers/registration";
import { Gender } from "./GenderDiv";
import { ErrorsDiv } from "./ErrorsDiv";
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

  // TODO: --> Birth Date section
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
        <h1>Sign Up</h1>
        <h4> it's quick and easy.</h4>
        <hr/>
        <div id ="register-username-div">
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
        </div>

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
        <Gender/>
        <ErrorsDiv  />
        <div id="register-response-div">{response}</div>
        
        <div id ="signup-button-div">
        <button
          onClick={async () => {
            setResponse(
              await Registration.register({
                age,
                country,
                email,
                firstName,
                lastName,
                password,
              })
            );
          }}
        >
          Sign Up
        </button>
        </div>
        
        
      </div>
    </div>
  );
};
