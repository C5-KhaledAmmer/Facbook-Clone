import { UserController } from "../../controllers/user";
import React, { useState } from "react";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //  (async ()=>{
    //   setUsers(await UserController.getAllUsers())
    // })()
  }, []);
  const navigate =useNavigate()
  return (
    <div>
      {/* {users.map((user) => {
        return <p>{user.userName}</p>;
      })} */}
      <button onClick={()=>{
        navigate("/s")
      }}>frsdadasdasdas</button>
    </div>
  );
};
