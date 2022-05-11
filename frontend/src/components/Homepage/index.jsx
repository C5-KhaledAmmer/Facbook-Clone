import { UserController } from "../../controllers/user";
import React, {useState} from "react"
import { useEffect } from "react";

export const Homepage = () => {
    
    const [users , setUsers] = useState([]);
    useEffect(()=>{
       (async ()=>{
        setUsers(await UserController.getAllUsers())
      })()
    },[])
  return <div>{users.map((user)=>{
    return <p>{user.userName}</p>
  })}</div>
};
