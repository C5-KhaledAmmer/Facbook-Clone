import { useEffect, useState } from "react";
import { PostController } from "../../../controllers/posts";
import { PostCreator } from "./PostCreator";
import "./style.css"

export const PostsArea = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      setPosts(await PostController.getAllPosts());
    })();
  }, []);

  const createPostCard = (post) => {
    return (
      <div id ="post-card" key={post._id}>
        <div style={{"display":"flex"}} >
         {post.author}
          {/* <div>X ---</div> */}
        </div>
        <div id="post-content">{post.content}</div>
        <div>

        </div>
        <div id ="post-reactions-buttons">
            <button>👍 Like</button>
            <button>💬 Comment</button>
        </div>
      </div>
    );
  };
  return (
    <div>
      <PostCreator />
      {posts.map((post) => {
        return createPostCard(post);
      })}
    </div>
  );
};
