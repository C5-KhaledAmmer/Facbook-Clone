import { UserController } from "../../controllers/user";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostController } from "../../controllers/posts";
import { Info } from "../../controllers/info";
import { Navbar } from "../Navbar";
import { SuggestionsFriend } from "../SuggestionsFriend";
import { PostsArea } from "./PostsArea";

export const Homepage = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState("[]");
  const [newComment, setNewComment] = useState("");
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
      <PostsArea />
        {/* <SuggestionsFriend /> */}
        
      </div>
    </div>
  );
};
