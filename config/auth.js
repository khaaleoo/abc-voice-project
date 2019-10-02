module.exports = {
  facebookAuth: {
    clientID: "402438833986174", // App ID của bản
    clientSecret: "49cb62bb7794b8000fa465c0c108210f", // App Secret của bạn
    callbackURL: "http://localhost:8000/login/auth/facebook/callback"
  },
  googleAuth: {
    clientID:
      "281275017967-6ab3pftfdn0tvi1n3re5kkgr298jch4e.apps.googleusercontent.com",
    clientSecret: "BWYUBNsgfcEhJZJ_qXB_hTrX",
    callbackURL: "http://localhost:8000/login/auth/google/callback"
  }
};
