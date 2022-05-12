import { UserController } from "../../controllers/user";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostController } from "../../controllers/posts";

export const Homepage = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState("[]");
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div>
      <button
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
          console.log("ASdasdasdasd");

          setPosts([
            ...posts,
            await PostController.createNewPost({ content: postContent }),
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
            </p>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
