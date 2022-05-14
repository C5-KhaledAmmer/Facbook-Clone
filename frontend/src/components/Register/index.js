import React, { useContext, useState } from "react";
import "./style.css";
import { Registration } from "../../controllers/registration";
import { Gender } from "./GenderDiv";
import { ErrorsDiv } from "./ErrorsDiv";
import "./style.css"
import { registrationCox } from "../WelcomePage";
export const Register = () => {
  // TODO: --> Birth Date section
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [errors, setErrors] = useState([]);
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
          className="input"
        />
      </div>
    );
  };

  const signUp = async () => {
    const inputForm = {
      UserName: `${firstName} ${lastName}`,
      Email: email,
      Password: password,
    };

    errors = Registration.checkFormErrors({
      isLoginForm: false,
      inputForm: inputForm,
    });
    console.log(errors);
    if (errors.length === 0) {
      const serverError = await Registration.register({
        firstName,

        lastName,
        email,
        password,
      });
      serverError === "Email already taken"
        ? setErrors([...errors, "Email already taken"])
        : setErrors(["SignUp Completed Successfully"]);
    } else {
      setErrors(errors);
    }
  };
  return (
    <div id="signup-form">
      <div id="signup-form-inner">
        <div id="signup--exit-button">
        <button onClick={()=>{setIsSignUp(false)}}>X</button>
        </div>
       
        <h1>Sign Up</h1>
        <h4> it's quick and easy.</h4>
        <hr />
        <div id="register-username-div">
          {createInput({
            placeholder: "First Name",
            type: "text",
            key: "UserName",
            setState: setFirstName,
          })}
          {createInput({
            placeholder: "Last Name",
            type: "text",
            key: "UserName",
            setState: setLastName,
          })}
        </div>

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
        <Gender />
        <ErrorsDiv errors={errors} />
        <div id="signup-button-div">
          <button onClick={signUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};
