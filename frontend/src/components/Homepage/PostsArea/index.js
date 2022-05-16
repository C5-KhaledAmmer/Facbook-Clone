import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "../../../controllers/info";
import { PostController } from "../../../controllers/posts";
import { PostCreator } from "./PostCreator";
import "./style.css"

export const PostsArea = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoaded){
      (async () => {
        await Info.isUserLogin(navigate);
        const posts = await PostController.getAllPosts();
        setPosts(posts);
        setIsLoaded(true)
        console.log(posts , Info.token);
      })();
     
    }
    
    
  }, [isLoaded]);

  const createPostCard = (post) => {
    return (
      <div id ="post-card" key={post._id}>
        <div id="post-picture-div" >
          <img src={post.author.profilePicture} className="postPicture"/>
         <h4>{post.author.userName}</h4>
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
      {posts.length  !== 0 ?posts.map((post) => {
        return createPostCard(post);
      }):<></>}
    </div>
  );
};
