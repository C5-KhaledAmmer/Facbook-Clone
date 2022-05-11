import axios from "axios";
import { Info, LocalStorage } from "./info";

export class Registration {
  static login({ navigate, email, password }) {
    const user = {
      email,
      password,
    };
    axios
      .post(`${Info.hostUrl}/login`, user)
      .then((res) => {
        LocalStorage.setItem({ key: "token", value: res.data.token });
        LocalStorage.setItem({ key: "userId", value: res.data.userId });
        Info.token = res.data.token;
        Info.userId = res.data.userId;
        Info.isLogin = true;
        navigate("/homepage");
      })
      .catch((err) => {
        return err.response.data.message;
      });
  }
  static async register({
    firstName,
    lastName,
    age,
    country,
    birthDate = Date.now(),
    email,
    password,
  }) {
    try {
      const user = {
        userName: firstName + lastName,
        birthDate: birthDate,
        age,
        country,
        email,
        password,
      };
      const response = await axios.post(`${Info.hostUrl}/users`, user);
      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
}
