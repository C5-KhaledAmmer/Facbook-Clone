import { useState } from "react";
import { Info } from "../../../../controllers/info";
import { PostController } from "../../../../controllers/posts";
import "./style.css";
export const Menu = ({ list, comment, setShowMenu }) => {
  const [content, setContent] = useState(comment.comment);
  const [isEditAreaShown, setIsEditAreaShown] = useState(false);
 
  const listItem = (item) => {
    return (
      <button
        className="menu-btn1"
        key={item}
        onClick={() => {
          switch (item.toLowerCase()) {
            case "edit":
              setIsEditAreaShown(true);
              break;
            case "delete":
              deleteComment();
              break;
          }
        }}
      >
        {item}
      </button>
    );
  };

  const showCommentArea = () => {
    return (
      <div id="edit-comment">
        <div id="inner-show-post-area">
          <div id="post-picture-div">
            <img
              src={Info.user.profilePicture}
              style={{ width: "60px", display: "flex" }}
            />
            <small>{Info.user.userName}</small>
          </div>
          <textarea
            placeholder={`Update Your Comment`}
            value={content}
            onChange={(e) => {
              console.log(content);
              setContent(e.target.value);
            }}
          ></textarea>
          <button
            id="edit-post-btn"
            onClick={() => {
              setIsEditAreaShown(true);
              updateComment();
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

  const updateComment = async () => {
    await PostController.updateComment(
        { comment:content, commentId: comment._id });
    setShowMenu(false);
  };
  const deleteComment = async () => {
    await PostController.deleteComment({ commentId: comment._id });
    setShowMenu(false);
  };

  return (
    <div id="comment-menu-div">
      <ul>
        {list.map((item) => {
          return listItem(item);
        })}
      </ul>
      {isEditAreaShown ? showCommentArea() : <></>}
    </div>
  );
};
