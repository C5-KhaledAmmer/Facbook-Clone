import { useState } from "react";
import { PostController } from "../../../controllers/posts";

import "./style.css";

export const Comments = ({ setShowComment, comments, postId }) => {
  const [comment, setComment] = useState("");
  const createCommentCard = (comment) => {
    return (
      <div id="comment-card" key={comment._id}>
        <div id="comment-card-img">
          <img src={comment.commenter.profilePicture} />
        </div>
        <div id="comment-card-p">
          <p>
            <strong>{comment.commenter.userName}</strong>
          </p>
          <p >{comment.comment}</p>
        </div>
      </div>
    );
  };

  const postComment = async () => {
    await PostController.createNewComment({
      comment: comment,
      postId: postId,
    });
  };
  return (
    <div
      id="comments-div"
      onClick={() => {
        /*  setShowComment(false) */
      }}
    >
      <div id="inner-comments-div">
        <hr />
        <div style={{ display: "flex" }}>
          <textarea
            placeholder="Add a comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <button id="add-comment-btn" onClick={postComment}>
            Add
          </button>
        </div>

        <div id="comments-viewer">
          {comments.map((comment) => {
            return createCommentCard(comment);
          })}
        </div>
      </div>
    </div>
  );
};
