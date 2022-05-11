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

  static async getAllFriendRequests() {
    try {
      const response = await axios.get(`${Info.hostUrl}/users/${Info.userId}`, {
        headers: { authorization: `Bearer ${Info.token}` },
      });
      return response.data.user.friendRequests;
    } catch (error) {
      return error.response.data.message;
    }
  }
  static async sendFriendRequest({receiver,sender}) {
      console.log(receiver,sender);
    try {
      const response = await axios.post(`${Info.hostUrl}/users/friend/request`, {sender,receiver},{
        headers: { authorization: `Bearer ${Info.token}` },
      });
      console.log(response);
      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
}
