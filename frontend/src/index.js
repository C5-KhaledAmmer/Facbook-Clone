import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

export class info {
  static token = null;
  static user = null;
  static isLogin = false;
}

export class localStorage {
  static getItem({ key }) {
    return JSON.parse(window.localStorage.getItem`(${key}`);
  }
  static setItem({ key, value }) {
    return window.localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  static removeItem({ key }) {
    return window.localStorage.removeItem(`${key}`);
  }

}
