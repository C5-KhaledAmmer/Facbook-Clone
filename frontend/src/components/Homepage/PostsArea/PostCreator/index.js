import { useState } from "react";
import { Img, Info } from "../../../../controllers/info";
import { PostController } from "../../../../controllers/posts";
import "./style.css";

export const PostCreator = () => {
  const [content, setContent] = useState("");
  const createButton = ({ icon, text, onClick }) => {
    return (
      <button  onClick={onClick}>
        <div>
        <img src={icon} />
        <small>{text}</small>
        </div>
        
      </button>
    );
  };
  const createPost = async () => {
    await PostController.createNewPost({ content });
  };

  return (
    <div>
      <div id="post-creator-div">
        <div id="post-creator-first-div">
          <div>
            <img src={Info.user.profilePicture} className="postPicture" />
          </div>
          <input placeholder={"What's in your mind, " + Info.user.userName} />
        </div>
        <div id="new-post-reactions-buttons" >
          {createButton({
            icon: Img.imagesUrl.live,
            onClick: () => {},
            text: "Live video",
          })}
          {createButton({
            icon: Img.imagesUrl.album,
            onClick: () => {},
            text: "photo/video",
          })}
          {createButton({
            icon: Img.imagesUrl.emoji,
            onClick: () => {},
            text: "Feeling/Activity",
          })}
        </div>
      </div>
    </div>
  );
};
