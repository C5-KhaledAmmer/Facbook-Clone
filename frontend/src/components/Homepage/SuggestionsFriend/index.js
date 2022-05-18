import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "../../../controllers/info";
import "./style.css";

const { UserController } = require("../../../controllers/user");

export const SuggestionsFriend = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const navigate = useNavigate();
  const [userFriendsId, setFriendsId] = useState([]);
  useEffect(() => {
    (async () => {
      await Info.isUserLogin(navigate);
      setFriendsId(Info.user.friends.map((friend) => friend._id));
     
      let suggestionsFriend = await UserController.getAllUsers();

      suggestionsFriend = suggestionsFriend.filter((user) => {
        return user._id !== Info.user.userId;
      });
      setUsers(suggestionsFriend);
      const user = await UserController.getCurrentUserInformation();

      if (user) {
        setRequests(user.friendRequests);
        setUserFriends(user.friends);
      }
    })();
  }, []);
 
  const friendCard = ({ bntText, onClick, user }) => {
    return (
      <div key={user._id} id="friend-card">
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
    <div id="fiend-suggestions-main-div">
      <div style={{ flex: "1" }}>
        <div className="suggestions-class">
          <h3>Friend Suggestions</h3>
          {users.filter(user => {
            return user._id !== Info.user.userId &&
            !userFriendsId.includes(user._id)
          }).map((user) => {
            return friendCard({
              onClick: [
                () => {
                  sendFriendRequest(user);
                },
                () => {},
              ],
              bntText: ["Add Friend", "Remove"],
              user,
            });
          })}
        </div>
      </div>
    </div>
  );
};
