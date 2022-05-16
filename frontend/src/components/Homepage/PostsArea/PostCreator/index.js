import { useState } from "react";
import { Info } from "../../../../controllers/info";
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
      <div>
        <img src={Info.profilePicture}/>

      </div>
      </div>
    </div>
  );
};
