import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Img, Info } from "../../../controllers/info";
import { PostController } from "../../../controllers/posts";
import { Comments } from "../Comments";
import { Menu } from "./Menu";
import { PostCreator } from "./PostCreator";
import "./style.css";

export const PostsArea = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState("0");
  const [viewMoreText, setViewMoreText] = useState(false);
  const [showCommentPage, setShowCommentPage] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);
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
        <div>
          <button
            onClick={() => {
              showMenu(post._id);
            }}
            id="post-menu-button"
            style={{ border: "0" }}
          >
            {post.author._id === Info.user.userId ? (
              <img src={Img.imagesUrl.menu} />
            ) : (
              <></>
            )}
          </button>
          {isMenuShown && post._id === currentPost ? (
            <Menu
              list={["Edit", "Delete"]}
              post={post}
              setShowMenu={setIsMenuShown}
            />
          ) : (
            <></>
          )}
        </div>

        <div id="post-picture-div">
          <div>
            <img src={post.author.profilePicture} className="postPicture" />
          </div>
          <div
            style={{
              display: "block",
              border: "0",
              textAlign: "start",
              maxWidth: "100%",
            }}
          >
            <h4>{post.author.userName}</h4>
            <h6>{`🕚` + Info.formatDate(post.date)}</h6>
          </div>
        </div>

        <div id="post-content">
          <p>
            {post.content.length > 560
              ? post.content.slice(0, 560)
              : post.content}
            {post.content.length > 560 ? (
              <span
                style={
                  viewMoreText && currentPost === post._id
                    ? {}
                    : {
                        fontWeight: "bold",
                        fontSize: "1.1em",
                        cursor: "pointer",
                      }
                }
                onClick={() => {
                  setViewMoreText(true);
                  setCurrentPost(post._id);
                }}
              >
                {viewMoreText && currentPost === post._id
                  ? post.content.slice(560)
                  : " view more ..."}
              </span>
            ) : (
              <></>
            )}
          </p>
        </div>
        <div></div>
        <div id="post-reactions-buttons">
          <button>👍 Like</button>
          <button
            onClick={() => {
              if (showCommentPage === true) {
                if(currentPost === post._id){
                  setShowCommentPage(!showCommentPage);
                }
              }else{
                setShowCommentPage(!showCommentPage);
              }
              setCurrentPost(post._id);
            }}
          >
            💬 Comment
          </button>
        </div>
        {showCommentPage && post._id === currentPost ? (
          <Comments
            comments={post.comments}
            postId={post._id}
            authorId={post.author._id}
          />
        ) : (
          <></>
        )}
      </div>
    );
  };
  const showMenu = (id) => {
    setCurrentPost(id);
    setIsMenuShown(!isMenuShown);
  };
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
