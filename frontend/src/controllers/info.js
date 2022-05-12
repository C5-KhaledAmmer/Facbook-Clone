export class Info {
  static token = null;
  static userId = null;
  static isLogin = false;
  static hostUrl = "http://localhost:5000";

  static isUserLogin(navigate) {
    this.token = LocalStorage.getItem({ key: "token" });
    this.userId = LocalStorage.getItem({ key: "userId" });
    this.isLogin = LocalStorage.getItem({ key: "isLogin" });

    if (this.token) {
      navigate("/homepage");
    }
  }
}

export class LocalStorage {
  static getItem({ key }) {
    return JSON.parse(window.localStorage.getItem(`${key}`));
  }
  static setItem({ key, value }) {
    return window.localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  static removeItem({ key }) {
    return window.localStorage.removeItem(`${key}`);
  }
}
