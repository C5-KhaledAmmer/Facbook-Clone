import { useState } from "react";
import { Img, Info } from "../../../controllers/info";
import { PostController } from "../../../controllers/posts";
import { Menu } from "./Menu";

import "./style.css";

export const Comments = ({ comments, postId, authorId }) => {
  const [comment, setComment] = useState("");
  const [comments1, setComments] = useState(comments);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [currentComment, setCurrentComment] = useState();
  const [isMenuShown, setIsMenuShown] = useState(false);
  const showMenu = (id) => {
    setCurrentComment(id);
    setIsMenuShown(!isMenuShown);
  };
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
          <p>{comment.comment}</p>
        </div>
        <div>
          {comment.commenter._id === Info.user.userId ||
          authorId === Info.user.userId ? (
            <button
              onClick={() => {
                showMenu(comment._id);
              }}
              id="comment-menu-button"
              style={{ border: "0" }}
            >
              <img src={Img.imagesUrl.menu2} />
            </button>
          ) : (
            <></>
          )}
          {isMenuShown && comment._id === currentComment ? (
            <Menu
              list={["Edit", "Delete"]}
              comment={comment}
              setShowMenu={setIsMenuShown}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const postComment = async () => {
    const commentId = await PostController.createNewComment({
      comment: comment,
      postId: postId,
    });
    comments1.unshift({
      _id: commentId,
      comment: comment,
      commenter: {
        _id: Info.user.userId,
        profilePicture: Info.user.profilePicture,
        userName: Info.user.userName,
      },
    });
    setTimeout(() => {
      setComments([...comments1]);
    }, 1000);
  };
  return (
    <div id="comments-div">
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
          {showMoreComments ? (
             comments1.map((comment) => {
              return createCommentCard(comment);
            })
          ) : (
            <div>
              {comments1.slice(0, 5).map((comment) => {
                return createCommentCard(comment);
              })}
              {comments1.length<6
              ?<></>
              :<button
                onClick={() => {
                  setShowMoreComments(true);
                }}
              >
                {"...View More Comments"}
              </button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
