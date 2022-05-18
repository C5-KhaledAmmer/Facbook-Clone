import { useState } from "react";
import { Info } from "../../../../controllers/info";
import "./style.css";
export const Menu = ({ list, post }) => {
  const [content, setContent] = useState(post.content);
  const [isEditAreaShown, setIsEditAreaShown] = useState(false);

  const listItem = (item) => {
    return (
      <button
        key={item}
        onClick={() => {
          switch (item.toLowerCase()) {
            case "edit":
              setIsEditAreaShown(true);

              break;
            case "delete":
              deletePost();
              break;
          }
        }}
      >
        {item}
      </button>
    );
  };

  const showPostArea = () => {
    return (
      <div id="edit-post">
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
              setIsEditAreaShown(true);
            }}
            disabled={content ? false : true}
          >
            Update
          </button>
          <div id="post-exit-button">
            <button
              onClick={() => {
                setIsEditAreaShown(false);
                updatePost(content);
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  };

  const updatePost = () => {};
  const deletePost = () => {
    console.log("Hi i am in delete box");
  };

  return (
    <div id="menu-div">
      <ul>
        {list.map((item) => {
          return listItem(item);
        })}
      </ul>
      {isEditAreaShown ? showPostArea() : <></>}
    </div>
  );
};
