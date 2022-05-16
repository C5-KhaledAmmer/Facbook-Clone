import search from "../assets/images/search.png"
import { User } from "../models/user";

export class Info {
  static user = new User({});
  static hostUrl = "http://localhost:5000";

  static async isUserLogin(navigate) {
    this.user=await LocalStorage.getItem({ key: "user" });
    
    // if (this.token) {
    //   navigate("/homepage");
    // }
  }
}

export class LocalStorage {
  static async getItem({ key }) {
    return JSON.parse(window.localStorage.getItem(`${key}`));
  }
  static async setItem({ key, value }) {
    return window.localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  static async removeItem({ key }) {
    return window.localStorage.removeItem(`${key}`);
  }
  
}

export class Img{
  static imagesUrl = {
    facebook : "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
    searchIcon:search,
    messenger:"https://cdn-icons-png.flaticon.com/128/733/733604.png",
    bell: "https://cdn-icons-png.flaticon.com/128/1827/1827349.png",
    home:"https://cdn-icons-png.flaticon.com/128/1946/1946436.png",
    menu :"https://cdn-icons-png.flaticon.com/128/56/56763.png",
    defaultUserImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"

  }
}