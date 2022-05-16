import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Img, Info } from "../../../controllers/info";
import { PostController } from "../../../controllers/posts";
import { PostCreator } from "./PostCreator";
import "./style.css";

export const PostsArea = () => {
  
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    
      (async () => {
        await Info.isUserLogin(navigate);
        const posts = await PostController.getAllPosts();
        setPosts(posts);
        
      })();
    
  }, []);

  const createPostCard = (post) => {
    return (
      <div id="post-card" key={post._id}>
        <button
          onClick={showMenu}
          id="post-menu-button"
          style={{ border: "0" }}
        >
          <img src={Img.imagesUrl.menu} />
        </button>

        <div id="post-picture-div">
          <img src={post.author.profilePicture} className="postPicture" />
          <h4>{post.author.userName}</h4>
        </div>
        <div id="post-content">{post.content}</div>
        <div></div>
        <div id="post-reactions-buttons">
          <button>👍 Like</button>
          <button>💬 Comment</button>
        </div>
      </div>
    );
  };
  const showMenu = () => {};
  return (
    <div>
      <PostCreator />
      {posts.length !== 0 ? (
        posts.map((post) => {
          return createPostCard(post);
        })
      ) : (
        <></>
      )}
    </div>
  );
};
