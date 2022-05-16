import { useEffect, useState } from "react";
import { UserController } from "../../../controllers/user";
import "./style.css";
export const FriendRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      const user = await UserController.getUserInformation();

      if (user) {
        setRequests(user.friendRequests);
      }
    })();
  }, []);
  const friendCard = ({ bntText, onClick, user }) => {
    console.log(user);
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
    <div id="fiend-suggestions-main-div">
      <div className="suggestions-class">
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
            bntText: ["Accept", "Remove"],
            user: friendRequest.sender,
          });
        })}
      </div>
    </div>
  );
};
