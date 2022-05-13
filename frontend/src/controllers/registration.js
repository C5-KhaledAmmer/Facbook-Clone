import axios from "axios";
import { Info, LocalStorage } from "./info";

export class Registration {
  static async login({ email, password }) {
    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${Info.hostUrl}/login`, user);

      LocalStorage.setItem({ key: "token", value: response.data.token });
      LocalStorage.setItem({ key: "userId", value: response.data.userId });
      Info.token = response.data.token;
      Info.userId = response.data.userId;
      Info.isLogin = true;

      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
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

  static checkFormErrors({ inputForm, isLoginForm = false }) {
    let errors = [];

    for (let key in inputForm) {
      if (!isLoginForm) {
        if (key === "UserName") {
          const value = inputForm[key];

          if (value === "") {
            if (!errors.includes("Invalid user name")) {
              errors.push("Invalid user name");
            }
          } else if (value.length > 15) {
            if (!errors.includes("User name must be less than 16 Characters")) {
              errors.push("User name must be less than 16 Characters");
            }
          } else if (value.length < 6) {
            if (!errors.includes("User name must be more than 5 Characters")) {
              errors.push("User name must be more than 5 Characters");
            }
          }
        }

        if (key === "Email") {
          const value = inputForm[key];
          if (!value.includes("@") || !value.includes(".com")) {
            if (!errors.includes("Invalid email")) {
              errors.push("Invalid email");
            }
          }
          /* else {
            if (isUserExist(value)[0]) {
              if (!errors.includes("This email was taken")) {
                errors.push("This email was taken");
              }
            }
          } */
        }
        if (key === "Password") {
          const value = inputForm[key];

          if (value === "") {
            if (!errors.includes("Invalid password")) {
              errors.push("Invalid password");
            }
          } else if (value.length > 30) {
            if (!errors.includes("Password must be less than 30 Characters")) {
              errors.push("Password must be less than 30 Characters");
            }
          } else if (value.length < 10) {
            if (!errors.includes("Password must be more than 9 Characters")) {
              errors.push("Password must be more than 9 Characters");
            }
          }
        }
      } else {
        if (key === "Email") {
          const value = inputForm[key];
          if (!value.includes("@") || !value.includes(".com")) {
            if (!errors.includes("Invalid email")) {
              errors.push("Invalid email");
            }
          }
          /* else {
            const [isExist, password] = isUserExist(value);
            if (!isExist) {
              if (!errors.includes("Please sign up first")) {
                removeError("Wrong password");
                errors.push("Please sign up first");
              }
            } else if (password !== inputForm["Password"]) {
              if (!errors.includes("Wrong password")) {
                errors.push("Wrong password");
              }
            }
          } */
        }
      }
    }

    return errors;
  }

  static removeErrors({ isLoginForm, errors, key, value }) {
    const removeError = (error) => {
      if (errors.includes(error)) {
        errors.splice(errors.indexOf(error), 1);
      }
    };

    if (!isLoginForm) {
      if (key === "UserName") {
        if (value !== "") {
          removeError("Invalid user name");
        }
        if (value.length >= 6) {
          removeError("User name must be more than 5 Characters");
        }
        if (value.length <= 15) {
          removeError("User name must be less than 16 Characters");
        }
      }

      if (key === "Email") {
        if (value.includes("@") && value.includes(".com")) {
          removeError("Invalid email");
        }
        /* if (!isUserExist(value)[0]) {
          removeError("This email was taken");
        } */
      }

      if (key === "Password") {
        if (value !== "") {
          removeError("Invalid password");
        }
        if (value.length <= 30) {
          removeError("Password must be less than 30 Characters");
        }
        if (value.length >= 10) {
          removeError("Password must be more than 9 Characters");
        }
      }
    } else {
      //ToDO : login request
    }
    return errors;
  }
}
