import { UserController } from "../../controllers/user";
import React, { useState } from "react";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { PostController } from "../../controllers/posts";

export const Homepage = () => {
  const [postContent,setPostContent] = useState("");
  const [posts,setPosts] = useState([]);
  useEffect(() => {
  
  }, []);
  const navigate =useNavigate()
  return (
    <div>
      <button onClick={()=>{
        navigate("/s")
      }}>Go to Friend Page</button>
      <br/>
      <br/>
      <textarea onChange={(e)=>{
        setPostContent(e.target.value)
      }}></textarea>
      <br/>
      <button onClick={async()=>{
        console.log("ASdasdasdasd");
       
        setPosts( [...posts,await PostController.createNewPost({content:postContent})])
      }}>Create New Post</button>
      {posts.length !== 0 ? posts.map(post=>{
        return <p> {post.content}</p>
      }):<></>}
    </div>
  );
};
