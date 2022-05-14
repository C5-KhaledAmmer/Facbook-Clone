import React, { useState } from "react";
import { Login } from "../Login";
import { Register } from "../Register";
import { createContext } from "react";
export const registrationCox= createContext()

export const WelcomePage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div>
      <registrationCox.Provider value={{setIsSignUp,isSignUp}}>
      {isSignUp? <Register  /> : <></>}
      <Login  />
      </registrationCox.Provider>
    </div>
  );
};
