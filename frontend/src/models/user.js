export class User {
  constructor({
    token,
    isLogin,
    userName,
    userId,
    profilePicture,
    friends=[],
  }) {
    this.token = token;
    this.isLogin = isLogin;
    this.userName = userName;
    this.userId = userId;
    this.profilePicture = profilePicture;
    this.friends = friends;
  }

  getCurrentUser() {}
}
