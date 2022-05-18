import search from "../assets/images/search.png"
import { User } from "../models/user";

export class Info {
  static user = new User({});
  static hostUrl = "http://localhost:5000";

  static async isUserLogin(navigate) {
    this.user=await LocalStorage.getItem({ key: "user" });
    
    if (this.token) {
      navigate(`/homepage/${Info.user.userId}`);
    }
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
    menu2:"https://cdn-icons.flaticon.com/png/512/2311/premium/2311524.png?token=exp=1652900289~hmac=47d3d6390fc053cefa5e04fec3297a80",
    defaultUserImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png",
    live:"https://cdn-icons.flaticon.com/png/512/2326/premium/2326122.png?token=exp=1652692400~hmac=8006b073d9e99df906ba91580f6afc16",
    album:"https://cdn-icons-png.flaticon.com/512/3342/3342207.png",
    emoji : "https://cdn-icons-png.flaticon.com/128/725/725107.png"


  }
}