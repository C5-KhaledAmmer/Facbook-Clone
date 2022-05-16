import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Info } from "../../controllers/info";
import { UserController } from "../../controllers/user";
import { Navbar } from "../Navbar";
import "./style.css";
export const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { userName } = useParams();

  useEffect(() => {
    (async () => {
      await Info.isUserLogin();
      setSearchResults(
        await UserController.getUserByUserName({
          name: userName.toLowerCase().replaceAll(" ", ""),
        })
      );
    })();
  }, []);
  const searchCard = ({ bntText, onClick, user }) => {
      
    return (
      <div key={user._id} id="search-card">
        <div className="request-img-div">
          <img src={user.profilePicture} />
          <small>{user.userName}</small>
        </div>
        <div className="friend-card-buttons">
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
          {searchResults ? (
            searchResults.map((user) => {
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
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
