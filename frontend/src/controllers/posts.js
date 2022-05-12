import axios from "axios";
import { Info } from "./info";
export class PostController {
  static async createNewPost({ content }) {
    const author = Info.userId;

    try {
      const response = await axios.post(
        `${Info.hostUrl}/posts`,
        { content, author },
        {
          headers: { authorization: `Bearer ${Info.token}` },
        }
      );
      return response.data.post;
    } catch (error) {
      return error.response.data.message;
    }
  }
  static async getAllPosts() {
    const userId = Info.userId;

    try {
      const response = await axios.get(`${Info.hostUrl}/posts/${userId}`, {
        headers: { authorization: `Bearer ${Info.token}` },
      });
      return response.data.posts;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static async updatePost({content,postId}) {
    

    try {
      const response = await axios.put(`${Info.hostUrl}/posts/update?postId=${postId}&&content=${content}`,{},{
        headers: { authorization: `Bearer ${Info.token}` },
      });
      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static async deletePost({postId}) {
    const userId = Info.userId;

    try {
      const response = await axios.delete(`${Info.hostUrl}/posts/delete?postId=${postId}&&userId=${userId}`,{
        headers: { authorization: `Bearer ${Info.token}` },
      });
      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
}
