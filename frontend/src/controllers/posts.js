import axios from "axios";
import { Info } from "./info";
export class PostController {
  static async createNewPost({ content }) {
    const author = Info.user.userId;
    const date = new Date();
    try {
      const response = await axios.post(
        `${Info.hostUrl}/posts`,
        { content, author, date },
        {
          headers: { authorization: `Bearer ${Info.user.token}` },
        }
      );

      return response.data.post;
    } catch (error) {
      return error;
    }
  }
  static async getAllPosts() {
    const userId = Info.user.userId;
    try {
      const response = await axios.get(`${Info.hostUrl}/posts/${userId}`, {
        headers: { authorization: `Bearer ${Info.user.token}` },
      });

      return response.data.posts;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static async updatePost({ content, postId }) {
    try {
      const response = await axios.put(
        `${Info.hostUrl}/posts/update?postId=${postId}&&content=${content}`,
        {},
        {
          headers: { authorization: `Bearer ${Info.user.token}` },
        }
      );
      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static async deletePost({ postId }) {
    const userId = Info.user.userId;

    try {
      const response = await axios.delete(
        `${Info.hostUrl}/posts/delete?postId=${postId}&&userId=${userId}`,
        {
          headers: { authorization: `Bearer ${Info.user.token}` },
        }
      );
      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
  static async createNewComment({ comment, postId }) {
    const commenter = Info.user.userId;
    try {
      const response = await axios.post(
        `${Info.hostUrl}/posts/${postId}/comment`,
        { commenter, comment },
        {
          headers: { authorization: `Bearer ${Info.user.token}` },
        }
      );
      return response.data.id;
    } catch (error) {
      return error;
    }
  }
  static async deleteComment({ commentId, postId }) {
    try {
      const response = await axios.delete(
        `${Info.hostUrl}/posts/comment/delete`,
        {
          headers: { authorization: `Bearer ${Info.user.token}` },
          data: { commentId, postId },
        }
      );

      return response.data.message;
    } catch (error) {
      return error;
    }
  }
  static async updateComment({ commentId, comment }) {
    try {
      const response = await axios.put(
        `${Info.hostUrl}/posts/comments/${commentId}`,
        { comment },
        {
          headers: { authorization: `Bearer ${Info.user.token}` },
        }
      );

      return response.data.message;
    } catch (error) {
      return error;
    }
  }
  static async createNewLike({ likeType, postId }) {
    const fan = Info.user.userId;
    console.log(postId);
    try {
      const response = await axios.post(
        `${Info.hostUrl}/posts/${postId}/like`,
        { fan, likeType },
        {
          headers: { authorization: `Bearer ${Info.user.token}` },
        }
      );

      return response.data.id;
    } catch (error) {
      return error;
    }
  }
  static async deleteLike({ likeId, postId }) {
    try {
      const response = await axios.delete(`${Info.hostUrl}/posts/like/delete`, {
        headers: { authorization: `Bearer ${Info.user.token}` },
        data: { likeId, postId },
      });

      return response.data.message;
    } catch (error) {
      return error;
    }
  }
}
