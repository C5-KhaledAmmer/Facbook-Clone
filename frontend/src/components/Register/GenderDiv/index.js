import React, { useState } from "react";
import "./style.css";
export const Gender = () => {
  const createInput = ({ label ,setState, type = "text" }) => {
    return (
      <div id="radio-div">
        <h5>{label}</h5>
        <input type="radio" name="radioButtons" value={label} defaultChecked= {false} />
      </div>
    );
  };

  // TODO: --> Birth Date section
  const [gender, setGender] = useState("Female");
  

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
