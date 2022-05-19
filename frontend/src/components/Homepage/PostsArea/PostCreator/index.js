import { useState } from "react";
import { Img, Info } from "../../../../controllers/info";
import { PostController } from "../../../../controllers/posts";
import "./style.css";

export const PostCreator = ({ setPosts, posts }) => {
  const [content, setContent] = useState("");
  const [isPostAreaShown, setIsPostAreaShown] = useState(false);
  const createPost = async () => {
    const { id } = await PostController.createNewPost({ content });
    const post = {
      _id: id,
      date: new Date(),
      author: {
        _id: Info.user.userId,

        profilePicture: Info.user.profilePicture,
        userName: Info.user.userName,
      },
      content: content,
      likes: [],
      comments: [],
    };
    setPosts([post, ...posts]);
  };
  const createButton = ({ icon, text, onClick }) => {
    return (
      <button onClick={onClick}>
        <div>
          <img src={icon} />
          <small>{text}</small>
        </div>
      </button>
    );
  };

  const showPostArea = () => {
    return (
      <div id="show-post-area">
        <div id="inner-show-post-area">
          <div id="post-picture-div">
            <img
              src={Info.user.profilePicture}
              style={{ width: "60px", display: "flex" }}
            />
            <small>{Info.user.userName}</small>
          </div>
          <textarea
            placeholder={`What's in your mind, ${Info.user.userName}`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button
            onClick={() => {
              createPost();

              setIsPostAreaShown(false);
            }}
            disabled={content ? false : true}
          >
            Post
          </button>
          <div id="post-exit-button">
            <button
              onClick={() => {
                setIsPostAreaShown(false);
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {isPostAreaShown ? showPostArea() : <></>}
      <div id="post-creator-div">
        <div id="post-creator-first-div">
          <div>
            <img src={Info.user.profilePicture} className="postPicture" />
          </div>
          <button
            onClick={() => {
              setIsPostAreaShown(true);
            }}
          >
            {content ? content : `What's in your mind, ${Info.user.userName}`}
          </button>
        </div>
        <div id="new-post-reactions-buttons">
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
