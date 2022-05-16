import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Img, Info } from "../../../controllers/info";
import { PostController } from "../../../controllers/posts";
import { Comments } from "../Comments";
import { PostCreator } from "./PostCreator";
import "./style.css";

export const PostsArea = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost,setCurrentPost]= useState([])
  const [showCommentPage, setShowCommentPage] = useState(true);
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
          <div>
            {" "}
            <img src={post.author.profilePicture} className="postPicture" />
          </div>

          <h4>{post.author.userName}</h4>
        </div>
        <div id="post-content">{post.content}</div>
        <div></div>
        <div id="post-reactions-buttons">
          <button>👍 Like</button>
          <button onClick={()=>{
            setCurrentPost(post._id);
            setShowCommentPage(true)
          }}>💬 Comment</button>
        </div>
        {showCommentPage && post._id === currentPost? <Comments comments={post.comments} postId={post._id} setShowComment={setShowCommentPage} /> : <></>}
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
