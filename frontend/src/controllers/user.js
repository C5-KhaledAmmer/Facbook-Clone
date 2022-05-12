import axios from "axios";
import { Info } from "./info";

export class UserController {
  static async getAllUsers() {
    try {
      const response = await axios.get(`${Info.hostUrl}/users`, {
        headers: { authorization: `Bearer ${Info.token}` },
      });

      return response.data.users;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static async getUserInformation() {
    try {
      const response = await axios.get(`${Info.hostUrl}/users/${Info.userId}`, {
        headers: { authorization: `Bearer ${Info.token}` },
      });
      return response.data.user;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static async getUserByUserName ({name}){
    try {
      const response = await axios.get(`${Info.hostUrl}/users/search_1/${name}`, {
        headers: { authorization: `Bearer ${Info.token}` },
      });
      console.log(response.data);
      return response.data.users;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static async sendFriendRequest({ receiver, sender }) {
    try {
      const response = await axios.post(
        `${Info.hostUrl}/users/friend/request`,
        { sender, receiver },
        {
          headers: { authorization: `Bearer ${Info.token}` },
        }
      );

      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
  static async acceptFriendRequest({ receiver, sender, requestId }) {
    try {
      const response = await axios.put(
        `${Info.hostUrl}/users/friend/add`,
        { sender, receiver, requestId },
        {
          headers: { authorization: `Bearer ${Info.token}` },
        }
      );

      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
  static async deleteFriendRequest({ receiver, requestId }) {
    try {
      const response = await axios.delete(
        `${Info.hostUrl}/users/friend/request/delete`,
        {
          headers: { authorization: `Bearer ${Info.token}` },
          data: {
            receiver,
            requestId,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
  static async deleteFriend({ userId, friendId }) {
    try {
      const response = await axios.delete(
        `${Info.hostUrl}/users/friend/delete`,
        {
          headers: { authorization: `Bearer ${Info.token}` },
          data: {
            userId,
            friendId,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
}
