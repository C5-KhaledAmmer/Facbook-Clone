import { useEffect, useState } from "react";
import { Info } from "../../controllers/info";
import "./style.css";

const { UserController } = require("../../controllers/user");

export const SuggestionsFriend = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    (async () => {
      setUsers(await UserController.getAllUsers());
      const user = await UserController.getUserInformation();

      if (user) {
        setRequests(user.friendRequests);
        setUserFriends(user.friends);
      }
    })();
  }, []);
  const friendCard = ({ bntText, onClick, user }) => {
    return (
      <div key={user._id} id="friend-card">
        <div>{user.userName}</div>
        <div className="friend-card-buttons">
          <button onClick={onClick[0]}>{bntText[0]}</button>
          <button onClick={onClick[1]}>{bntText[1]}</button>
        </div>
      </div>
    );
  };
  const sendFriendRequest = async (user) => {
    const receiver = user._id;
    const sender = Info.userId;
    await UserController.sendFriendRequest({
      receiver,
      sender,
    });
  };
  const acceptFriendRequest = async (friendRequest) => {
    const receiver = friendRequest.receiver;
    const sender = friendRequest.sender;
    const requestId = friendRequest._id;
    await UserController.acceptFriendRequest({
      receiver,
      sender,
      requestId,
    });
  };
  const deleteFriendRequest = async (friendRequest) => {
    const receiver = friendRequest.receiver;
    const requestId = friendRequest._id;
    await UserController.deleteFriendRequest({
      receiver,
      requestId,
    });
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <div style={{ flex: "1" }}>
          <h3>Friend Requests</h3>
          {requests.map((friendRequest) => {
            return friendCard({
              onClick: [
                () => {
                  acceptFriendRequest(friendRequest);
                },
                () => {
                  deleteFriendRequest();
                },
              ],
              bntText:["Accept","Remove"],
              user:friendRequest.sender
            })
          })}
        </div>
        <h3>Friend Suggestions</h3>
        {users.map((user) => {
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

      {/* <div style={{ flex: "1" }}>
        Search for user
        <br />
        <input
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            setSearchUsers(
              await UserController.getUserByUserName({ name: searchName })
            );
          }}
        >
          search
        </button>
        {searchUsers.length !== 0 ? searchUsers.map(user=>{
          return <p key={user._id}>{user.userName}</p>
        }):<></>}
      </div> */}
    </div>
  );
};
