import { useState } from "react";
import { Img, Info } from "../../controllers/info";
import { NavbarButtons } from "./NavbarButtons";
import "./style.css";
export const Navbar = () => {
  
  const [searchResults,setSearchResults] = useState([])
  const search = (userName)=>{
    console.log("****",Info.user.friends);
    Info.user.friends.forEach(friend => {
        if(friend.userName.toLowerCase() === userName){
          console.log("yex");
        }
    });
    

  }
  return (
    <div id="nav-bar">
      <div id="nav-bar-first-div">
      <img src={Img.imagesUrl.facebook} />
      <h2>FACEBOOK</h2>
      </div>
      <input id ="search-div" placeholder="Search for a friend" onChange={(e)=>{
        search(e.target.value)
      }}/>
      <NavbarButtons/>
     
    </div>
  );
};
