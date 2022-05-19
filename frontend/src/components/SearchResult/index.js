import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Info } from "../../controllers/info";
import { UserController } from "../../controllers/user";
import { Navbar } from "../Navbar";
import "./style.css";
export const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { userName } = useParams();
  const [userFriends, setUserFriends] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await Info.isUserLogin(navigate);
      setSearchResults(
        await UserController.getUserByUserName({
          name: userName.toLowerCase().replaceAll(" ", ""),
        })
      );
      const users = Info.user.friends.map((friend) => friend._id);
      setUserFriends(users);
    })();
  }, []);
  const searchCard = ({ bntText, onClick, user }) => {
    return (
      <div key={user._id} id="search-card">
        <div className="search-img-div">
          <img src={user.profilePicture} />
        </div>
        <small>{user.userName}</small>
        <div className="search-card-buttons">
          <button onClick={onClick[0]}>{bntText[0]}</button>
          <button onClick={onClick[1]}>{bntText[1]}</button>
        </div>
      </div>
    );
  };

  const sendFriendRequest = async (user) => {
    const receiver = user._id;
    const sender = Info.user.userId;
    await UserController.sendFriendRequest({
      receiver,
      sender,
    });
  };

  return (
    <div>
      <Navbar />
      <div id="search-page">
        <div id="inner-search-page">
          {searchResults.length ? (
            searchResults
              .filter((user) => {
                //* handle the user friends
                return !userFriends.includes(user._id);
              })
              .map((user) => {
                return searchCard({
                  onClick: [
                    () => {
                      sendFriendRequest(user);
                    },
                    () => {},
                  ],
                  bntText: ["Add Friend", "Remove"],
                  user,
                });
              })
          ) : (
            <p>No user has this user name : {userName}</p>
          )}
        </div>
      </div>
    </div>
  );
};
