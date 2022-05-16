import search from "../assets/images/search.png"

export class Info {
  static token = null;
  static userId = null;
  static userName =null;
  static userFriends =[];
  static isLogin = false;
  static hostUrl = "http://localhost:5000";

  static async isUserLogin(navigate) {
    this.token = await LocalStorage.getItem({ key: "token" });
    this.userId = await LocalStorage.getItem({ key: "userId" });
    this.isLogin =  await LocalStorage.getItem({ key: "isLogin" });
    this.userName = await LocalStorage.getItem({ key: "userName" });
    this.userFriends = await LocalStorage.getItem({ key: "userFriends" });
    if (this.token) {
      navigate("/homepage");
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
    defaultUserImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"

  }
}