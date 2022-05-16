import { useState } from "react";
import { Img, Info } from "../../controllers/info";
import { NavbarButtons } from "./NavbarButtons";
import "./style.css";
export const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const search = (userName) => {
    userName = userName.toLowerCase().replaceAll(" ", "");
    Info.user.friends.forEach((friend) => {
      const friendUserName = friend.userName.toLowerCase().replaceAll(" ", "");
      if (friendUserName.includes(userName)) {
        searchResults.push(friend);
      }
    });
    //* to search outside user friends
    searchResults.push("Search more");
    setSearchResults(searchResults);
  };
  const createSearchCard = () => {
    return (
    <div style={{position:"absolute"}}>

    </div>);
  };
  return (
    <div id="nav-bar">
      <div id="nav-bar-first-div">
        <img src={Img.imagesUrl.facebook} />
        <h2>FACEBOOK</h2>
      </div>
      <div style={{ flex: "1", display: "flex" ,position:"relative"}}>
        <input
          id="search-div"
          placeholder="Search for a friend"
          onChange={(e) => {
            search(e.target.value);
          }}
        />
        {searchResults ? createSearchCard(searchResults) : <></>}
      </div>

      <NavbarButtons />
    </div>
  );
};
