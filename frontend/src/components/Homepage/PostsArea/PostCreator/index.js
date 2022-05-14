import { useState } from "react";
import { PostController } from "../../../../controllers/posts";
import "./style.css";

export const PostCreator = () => {
    const [content,setContent] = useState("")
    const createPost=async()=>{
    await PostController.createNewPost({content})
    }
  return (
    <div >
      <div id="post-creator-div">
      <textarea   cols="40" rows="5" placeholder="What do you think"
      onChange={(e)=>{setContent(e.target.value)}}
      ></textarea>
      <button onClick={createPost}>Post</button>
      </div>
    </div>
  );
};
