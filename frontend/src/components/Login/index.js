import { useContext } from "react";
import { registrationCox } from "../WelcomePage";
import { GreetingDiv } from "./LoginForm/GreetingDiv";
import { LoginForm } from "./LoginForm";
import "./style.css";

export const Login = () => {
  const {isSignUp} = useContext(registrationCox)
  return (
    <div id="login-form" style={isSignUp?{"opacity":"0.5"}:{"opacity":"1"}}>
      <div id="login-form-inner">
        <div id="login-form-inner2">
          <GreetingDiv />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
