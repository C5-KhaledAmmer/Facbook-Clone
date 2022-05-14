import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
import { Registration } from "../../../controllers/registration";
import { ErrorsDiv } from "../../Register/ErrorsDiv";
import { registrationCox } from "../../WelcomePage";

export const LoginForm = () => {
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const {setIsSignUp} = useContext(registrationCox) 

  const createInput = ({ placeholder, setState, type = "text", key = "" }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            setErrors(
              Registration.removeErrors({
                isLoginForm: false,
                key: key,
                value: e.target.value,
                errors,
              })
            );
            setState(e.target.value);
          }}
          className="input1"
        />
      </div>
    );
  };
  const login = async () => {
    
    const inputForm = {
      Email: email,
      Password: password,
    };
    
    errors = Registration.checkFormErrors({
      isLoginForm: true,
      inputForm: inputForm,
    });

    if (errors.length === 0) {
      email = email.toLowerCase().trim();
      const serverError = await Registration.login({
        email,
        password,
      });

      serverError !== "Login Successful"
        ? setErrors([...errors, serverError])
        : navigate("/homepage");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div id="login-form-email-password-div">
      {createInput({
        placeholder: "Email",
        type: "text",
        key: "Email",
        setState: setEmail,
      })}
      {createInput({
        placeholder: "Password",
        type: "password",
        key: "Password",
        setState: setPassword,
      })}
      <ErrorsDiv errors={errors} />
      <div>
        <button id="login-button" onClick={login}>Login</button>
      </div>
      <hr />
      <div id="create-new-account-button">
      <button
        onClick={() => {
    
            setIsSignUp(true)
        }}
      >
        Create New Account
      </button>
      </div>
     
    </div>
  );
};
