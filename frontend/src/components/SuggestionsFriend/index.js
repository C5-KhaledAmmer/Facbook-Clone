import { useEffect, useState } from "react";
import { Info } from "../../controllers/info";

const { UserController } = require("../../controllers/user");

export const SuggestionsFriend = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    (async () => {
      setUsers(await UserController.getAllUsers());
      setRequests(await UserController.getAllFriendRequests());
    })();
  }, []);
  return (
    <div style={{"display":"flex"}}>
      <div style={{"flex":"1"}}>
        friendRequests
        {requests.map((user) => {
          return <p key={user._id}>{user.sender}</p>;
        })}
      </div>
      <div style={{"flex":"1"}}>
        Add Frind
        {users.map((user) => {
          return <div key={user._id}>
            {user.userName}
            <hr/>
            <button onClick={()=>{
              (async()=>{
                const receiver = user._id;
                const sender = Info.userId;
                await UserController.sendFriendRequest({receiver,sender})
              })()
            }}>Add Friend</button>
            <button>Remove</button>
            </div>;
        })}
      </div>
    </div>
  );
};
