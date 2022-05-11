import axios from "axios";
import { Info } from "./info";

export class UserController {
  static async getAllUsers() {
    try {
      const response = await axios.get(`${Info.hostUrl}/users`,{headers:{authorization:`Bearer ${Info.token}` }});
     
      return response.data.users;
    } catch (error) {
      return error.response.data.message;
    }
  }
}
