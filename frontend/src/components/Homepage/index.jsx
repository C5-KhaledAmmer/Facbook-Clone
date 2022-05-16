import React, { useState } from "react";
import { useEffect } from "react";
import { Navbar } from "../Navbar";
import { SuggestionsFriend } from "../SuggestionsFriend";
import { FriendRequest } from "./FriendRequest";
import { PostsArea } from "./PostsArea";

export const Homepage = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState("[]");
  const [newComment, setNewComment] = useState("");
  useEffect(() => {}, []);
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" ,justifyContent:"space-between"}}>
      {/* <FriendRequest/> */}
      <PostsArea />
      {/* <SuggestionsFriend /> */}
     
      </div>
    </div>
  );
};
/* 
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
*/