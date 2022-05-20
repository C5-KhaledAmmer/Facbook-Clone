import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Img, Info } from "../../../controllers/info";
import { PostController } from "../../../controllers/posts";
import { Comments } from "../Comments";
import { Menu } from "./Menu";
import { PostCreator } from "./PostCreator";
import { AiOutlineComment, AiOutlineLike, AiFillLike } from "react-icons/ai";
import "./style.css";

export const PostsArea = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState("0");
  const [viewMoreText, setViewMoreText] = useState(false);
  const [showCommentPage, setShowCommentPage] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [commentCounter, setCommentCounter] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      await Info.isUserLogin(navigate);
      setPosts(await PostController.getAllPosts());
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
              setPosts={setPosts}
              posts={posts}
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
          {setAllOrPartOfPost(
            post,
            viewMoreText,
            currentPost,
            setViewMoreText,
            setCurrentPost
          )}
          {post.assetsType === "none"
          ?<></>
          :(post.assetsType === "img"
          ?<img src={post.assets}/>
          :<video controls src={post.assets} style={{ width: "100%" }} />)
          }
        </div>
        <div>
          <span style={{ fontSize: "14px" }}>
            {post.likes.length +
              `👍` +
              "     " +
              `${post.comments.length + commentCounter}` +
              " "}
            <AiOutlineComment />
          </span>
        </div>
        <div id="post-reactions-buttons">
          {setRemoveLike(post)}

          {commentButton(post)}
        </div>
        {showCommentPage && post._id === currentPost ? (
          <Comments
            comments={post.comments}
            postId={post._id}
            authorId={post.author._id}
            setCommentCounter={setCommentCounter}
            counter={commentCounter}
          />
        ) : (
          <></>
        )}
      </div>
    );
  };
  

  const commentButton = (post) => {
    return (
      <button
        onClick={() => {
          if (showCommentPage === true) {
            if (currentPost === post._id) {
              setShowCommentPage(!showCommentPage);
            }
          } else {
            setShowCommentPage(!showCommentPage);
          }
          setCurrentPost(post._id);
        }}
      >
        💬 Comment
      </button>
    );
  };

  const setRemoveLike = (post) => {
    const like = post.likes.filter((like) => {
      return like.fan._id === Info.user.userId;
    });
    return like.toString() ? (
      <button
        onClick={() => {
          removeLike(post, like[0]._id);
        }}
      >
        <AiFillLike style={{ fontSize: "1.5em", color: "blue" }} /> Liked
      </button>
    ) : (
      <button
        onClick={() => {
          addLike(post._id);
        }}
      >
        <AiOutlineLike style={{ fontSize: "1.5em" }} /> Like
      </button>
    );
  };
  const showMenu = (id) => {
    setCurrentPost(id);
    setIsMenuShown(!isMenuShown);
  };
  const removeLike = async (post, likeId) => {
    //* removeLike from a post
    firstLoop: for (let i = 0; i < posts.length; i++) {
      if (posts[i]._id === post._id) {
        const likes = posts[i].likes;
        for (let index in likes) {
          if (likes[index]._id === likeId) {
            posts[i].likes.splice(index, 1);
            break firstLoop;
          }
        }
      }
    }
    await PostController.deleteLike({ postId: post._id, likeId });
    setPosts([...posts]);
  };
  const addLike = async (postId, likeType = "like") => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i]._id === postId) {
        const likeId = await PostController.createNewLike({ postId, likeType });
        posts[i].likes.push({
          likeType,
          fan: {
            _id: Info.user.userId,
            profilePicture: Info.user.profilePicture,
            userName: Info.user.userName,
          },
          _id: likeId,
        });
        break;
      }
    }

    setPosts([...posts]);
  };
  return (
    <div id="post-show-area">
      
      <PostCreator setPosts={setPosts} posts={[...posts]} />
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
function setAllOrPartOfPost(
  post,
  viewMoreText,
  currentPost,
  setViewMoreText,
  setCurrentPost
) {
  return (
    <p>
      {post.content.length > 560 ? post.content.slice(0, 560) : post.content}
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
  );
}
