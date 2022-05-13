import { GreetingDiv } from "./GreetingDiv";
import { LoginForm } from "./LoginForm";
import "./style.css";

export const Login = () => {
  return (
    <div id="login-form">
      <div id="login-form-inner">
        <div id="login-form-inner2">
          <GreetingDiv />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
