import React, { useState } from "react";
import { Registration } from "../../../controllers/registration";
import "./style.css";
export const Gender = ({setGender,setErrors,errors}) => {
  const createInput = ({ label ,setState, type = "text" }) => {
    return (
      <div id="radio-div">
        <h5>{label}</h5>
        <input type="radio" name="radioButtons" value={label} defaultChecked= {false} onChange={(e)=>{
          setGender(e.target.value)
          setErrors(
            Registration.removeErrors({
              isLoginForm: false,
              key: "Gender",
              value: e.target.value,
              errors
            })
          )
        }}/>
      </div>
    );
  };

  return (
   <div  id = "gender-div">
       {createInput({
          type: "radio",
          setState: setGender,
          label: "Female"
        })}
        {createInput({
          type: "radio",
          setState: setGender,
          label: "Male"
        })}
   </div>
      
  )
};
