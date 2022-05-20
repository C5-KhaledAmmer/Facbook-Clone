import { useState } from "react";
import { Img, Info } from "../../../../controllers/info";
import { PostController } from "../../../../controllers/posts";
import "./style.css";

export const PostCreator = ({ setPosts, posts }) => {
  const [content, setContent] = useState("");
  const [isPostAreaShown, setIsPostAreaShown] = useState(false);
  const [url, setUrl] = useState("");
  const [img, setImage] = useState("");

  const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "hvkyb7uz");
    formData.append("cloud_name", "dkldpbnkn/");
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dkldpbnkn/image/upload",
      {
        method: "post",
        body: formData,
      }
    );
    const data = await result.json();
    setUrl(data.url);
  };
  const createPost = async () => {
    let post = {};
    console.log(typeof url, url);
    if (img) {
      const { id } = await PostController.createNewPost({
        content,
        assetsType: "img",
        assets: url,
      });
      post = {
        _id: id,
        date: new Date(),
        assets: url,
        assetsType: "img",
        author: {
          _id: Info.user.userId,
          profilePicture: Info.user.profilePicture,
          userName: Info.user.userName,
        },
        content: content,
        likes: [],
        comments: [],
      };
    } else {
      const { id } = await PostController.createNewPost({
        content,
        assetsType: "none",
        assets: "none",
      });
      post = {
        _id: id,
        date: new Date(),
        assets: "none",
        assetsType: "none",
        author: {
          _id: Info.user.userId,
          profilePicture: Info.user.profilePicture,
          userName: Info.user.userName,
        },
        content: content,
        likes: [],
        comments: [],
      };
    }

    // setPosts([post, ...posts]);
  };

  const showImgAndText = () => {
    return (
      <div id="mix-input-div">
        <input
          placeholder={`What's in your mind, ${Info.user.userName}`}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <img src={url} />
      </div>
    );
  };

  const createButton = ({ icon, text, onClick }) => {
    return (
      <button>
        <div style={{ position: "relative" }}>
          <img src={icon} />
          <small>{text}</small>
          <input
            style={{ position: "absolute", left: "20%", opacity: "0" }}
            type="file"
            value={""}
            onClick={() => {
              setImage("");
            }}
            onChange={(e) => {
              setIsPostAreaShown(true);
              setImage(e.target.files[0]);
              uploadImage(e.target.files[0]);
            }}
          />
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
          {img ? (
            showImgAndText()
          ) : (
            <textarea
              placeholder={`What's in your mind, ${Info.user.userName}`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          )}

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
