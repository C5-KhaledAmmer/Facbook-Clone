import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "../../controllers/info";
import { PostController } from "../../controllers/posts";
import { Navbar } from "../Navbar";
import { SuggestionsFriend } from "./SuggestionsFriend";
import { FriendRequest } from "./FriendRequest";
import { PostsArea } from "./PostsArea";

export const Homepage = () => {
  const navigate =useNavigate();
  useEffect(() => {
    (async () => {
      await Info.isUserLogin(navigate);
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" ,justifyContent:"space-between"}}>
      <FriendRequest/> 
      <PostsArea />
    
      <SuggestionsFriend />
      
     
      </div>
    </div>
  );
};
