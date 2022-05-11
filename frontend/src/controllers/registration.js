import axios from "axios";
import { Info, LocalStorage } from "./info";

export class Registration {

  static login({navigate,email,password}) {
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
  
}
