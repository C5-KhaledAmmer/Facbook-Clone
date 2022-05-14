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
  const sendFriendRequest1 = async (user) => {
    const receiver = user._id;
    const sender = Info.userId;
    await UserController.sendFriendRequest({
      receiver,
      sender,
    });
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <h3>Friend Suggestions</h3>
        {users.map((user) => {
          return friendCard({
            onClick: [
              () => {
                sendFriendRequest1(user);
              },
              () => {},
            ],
            bntText: ["Add Friend", "Remove"],
            user,
          });
          /* 
          <div style={{ flex: "1" }}>
        friendRequests
        <hr />
        <hr />
        {requests.map((friendRequest) => {
          return (
            <div key={friendRequest._id}>
              {friendRequest.sender.userName}
              <hr />
              <button
                onClick={() => {
                  (async () => {
                    const receiver = friendRequest.receiver;
                    const sender = friendRequest.sender;
                    const requestId = friendRequest._id;
                    await UserController.acceptFriendRequest({
                      receiver,
                      sender,
                      requestId,
                    });
                  })();
                }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  (async () => {
                    const receiver = friendRequest.receiver;
                    const requestId = friendRequest._id;
                    await UserController.deleteFriendRequest({
                      receiver,
                      requestId,
                    });
                  })();
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
          */

          //   )(
          //   // <div key={user._id}>
          //   //   {user.userName}
          //   //   <hr />
          //   //   <button
          //   //     onClick={() => {
          //   //       sendFriendRequest(user);
          //   //     }}
          //   //   >
          //   //     Add Friend
          //   //   </button>
          //   // </div>
          // );
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
