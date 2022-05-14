import { UserController } from "../../controllers/user";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostController } from "../../controllers/posts";
import { Info } from "../../controllers/info";
import { Navbar } from "../Navbar";


export const Homepage = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState("[]");
  const [newComment, setNewComment] = useState("");
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div >
       {Info.isUserLogin ? <Navbar/>:<></>}
      <button
      style={{"margin":"20px",}}
        onClick={() => {
          navigate("/s");
        }}
      >
        Go to Friend Page
      </button>
      <br />
      <br />
      <textarea
        onChange={(e) => {
          setPostContent(e.target.value);
        }}
      ></textarea>
      <br />
      <button
        onClick={async () => {
          const newPost = await PostController.createNewPost({
              content: postContent,
            })

          setPosts([
            newPost,...posts
          ]);
        }}
      >
        Create New Post
      </button>
       <button
        onClick={async () => {
          setPosts([...posts, ...(await PostController.getAllPosts())]);
        }}
      >
        get All Posts
      </button>
      {/* {posts.length !== 0 ?posts.map((e)=>{
        return  <p>{e.content}</p>
      }):<></>} */}
      {posts.length !== 0 ? (
        posts.map((post, index) => {
          return (
            <p key={post._id}>
              {post.content}
              <input
                style={{ margin: "6px" }}
                onChange={(e) => {
                  setUpdatePost(e.target.value);
                }}
              />
              <button
                onClick={async () => {
                  const result = await PostController.updatePost({
                    postId: post._id,
                    content: updatePost,
                  });
                  if (result === "Post Updated") {
                    posts[index].content = updatePost;
                    setPosts([...posts]);
                  }
                }}
              >
                UpdatePost
              </button>
              <button
                onClick={async () => {
                  const result = await PostController.deletePost({
                    postId: post._id,
                  });
                  if (result === "Post Updated") {
                    posts[index].content = updatePost;
                    setPosts([...posts]);
                  }
                }}
              >
                DeletePost
              </button>
              <br />
              <br />
              Add Comment{" "}
              <input
                style={{ margin: "6px" }}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />
              <button
                onClick={async () => {
                  const result = await PostController.createNewComment({
                    comment: newComment,
                    postId:post._id
                  });
                  if (result === "Comment Added") {
                    post.comments.push(newComment);
                    setPosts([...posts]);
                  }
                }}
              >
                AddComment
              </button>
              
              <br />
              <br />
              Post Comments
              {post.comments.length !== 0 ? (
                post.comments.map((comment) => {
                  console.log(comment);
                  return <p key={comment}>{comment}
                  <button
                onClick={async () => {
                  const result = await PostController.deleteComment({
                    commentId:comment,
                    postId:post._id
                  });
                  if (result === "Comment Deleted") {
                    post.comments.splice(post.comments.indexOf(comment));
                    setPosts([...posts]);
                  }
                }}
              >
                DeleteComment
              </button>
                  </p>;
                })
              ) : (
                <></>
              )}
            </p>
          );
        })
      ) : (
        <></>
       )} 
    </div>
  );
};
