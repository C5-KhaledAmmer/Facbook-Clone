import { useEffect, useState } from "react";
import { Info } from "../../controllers/info";

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
  return (
    <div style={{ display: "flex" }}>
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
      <div style={{ flex: "1" }}>
        Add Frind
        {users.map((user) => {
          return (
            <div key={user._id}>
              {user.userName}
              <hr />
              <button
                onClick={() => {
                  (async () => {
                    const receiver = user._id;
                    const sender = Info.userId;
                    await UserController.sendFriendRequest({
                      receiver,
                      sender,
                    });
                  })();
                }}
              >
                Add Friend
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ flex: "1" }}>
        Friends
        {userFriends.map((friend, index) => {
          return (
            <div key={friend._id}>
              {friend.userName}
              <hr />
              <button
                onClick={() => {
                  (async () => {
                    await UserController.deleteFriend({
                      userId: Info.userId,
                      friendId: friend._id,
                    });
                  })();
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ flex: "1" }}>
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
      </div>
    </div>
  );
};
