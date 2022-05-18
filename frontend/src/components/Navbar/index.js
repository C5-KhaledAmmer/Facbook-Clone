import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Img, Info } from "../../controllers/info";
import { NavbarButtons } from "./NavbarButtons";
import "./style.css";
export const Navbar = () => {
  let [searchResults, setSearchResults] = useState(false);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  const search = (userName) => {
    if (userName.length === 0) {
      setSearchResults(false);
    } else {
      searchResults = [];
      userName = userName.toLowerCase().replaceAll(" ", "");
      Info.user.friends.forEach((friend) => {
        const friendUserName = friend.userName
          .toLowerCase()
          .replaceAll(" ", "");
        if (friendUserName.includes(userName)) {
          searchResults.push(friend);
        }
      });

      //* to search outside user friends
      searchResults.push("Search more");
      setSearchResults(searchResults);
    }
    setSearchName(userName);
  };
  const createSearchCard = (user) => {
    if (user === "Search more") {
      return (
        <div key={"search"} className="search-card1">
          <button
            style={{ borderBottom: "0px" }}
            className="request-img-div"
            onClick={() => {
              navigate(`/searchResult/${Info.user.userId}/${searchName}`);
            }}
          >
            <img src={Img.imagesUrl.searchIcon} />
            <small>Search More</small>
          </button>
        </div>
      );
    }
    return (
      <div key={user._id + user.userName} className="search-card1">
        <button className="request-img-div">
          <img src={user.profilePicture} />
          <small>{user.userName}</small>
        </button>
      </div>
    );
  };
  return (
    <div id="nav-bar">
      <div id="nav-bar-first-div">
        <img src={Img.imagesUrl.facebook} />
        <h2>FACEBOOK</h2>
      </div>
      <div style={{ flex: "1", display: "flex", position: "relative" }}>
        <input
          id="search-div"
          placeholder="Search for a friend"
          onChange={(e) => {
            search(e.target.value);
          }}
        />
        {searchResults ? (
          <div id="search-result-div">
            {searchResults.map((user) => {
              return createSearchCard(user);
            })}
          </div>
        ) : (
          <></>
        )}
      </div>

      <NavbarButtons />
    </div>
  );
};
