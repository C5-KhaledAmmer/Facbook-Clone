import React, { useState } from "react";
import { Login } from "../Login";
import { Register } from "../Register";

export const WelcomePage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div>
      <Login setIsSignUp={setIsSignUp} />
      {isSignUp ? <Register setIsSignUp={setIsSignUp} /> : <></>}
    </div>
  );
};
