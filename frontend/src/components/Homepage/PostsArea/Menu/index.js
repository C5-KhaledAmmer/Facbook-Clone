import { useState } from "react";
import { Info } from "../../../../controllers/info";
import { PostController } from "../../../../controllers/posts";
import "./style.css";
export const Menu = ({ list, post, setShowMenu, setPosts, posts }) => {
  const [content, setContent] = useState(post.content);
  const [isEditAreaShown, setIsEditAreaShown] = useState(false);

  const listItem = (item) => {
    return (
      <button
        className="menu-btn"
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
            id="edit-post-btn"
            onClick={() => {
              setIsEditAreaShown(true);
              updatePost();
              setShowMenu(false);
            }}
            disabled={content ? false : true}
          >
            Update
          </button>
          <div id="post-exit-button">
            <button
              onClick={() => {
                setIsEditAreaShown(false);
                setShowMenu(false);
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  };

  const updatePost = async () => {
    for (let i = 0; i < posts.length; i++) {
      if (post._id === posts[i]._id) {
        posts[i].content = content;
        setPosts([...posts]);
        break;
      }
    }
    await PostController.updatePost({ content, postId: post._id });
    setShowMenu(false);
  };
  const deletePost = async () => {
    await PostController.deletePost({ postId: post._id });
    for (let i = 0; i < posts.length; i++) {
      if (post._id === posts[i]._id) {
        posts.splice(i, 1);
        setPosts([...posts]);
        break;
      }
    }

    setShowMenu(false);
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
