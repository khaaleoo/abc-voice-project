var express = require("express");
var router = express.Router();
var userModel = require("../model/user.model");
router.get("/", async (req, res, next) => {
    var message = "Lỗi xác thực";
    const user = await userModel.verifyEmail(req.query.id);
    if (user) {
      console.log("email is verified");
      message =
        "Tài khoản " +
        user.user_name +
        " đã được kích hoạt với email: " +
        user.email;
    } else {
      console.log("email is not verified");
    }
  
    res.render("login/verifyEmail", {
      title: "Kích hoạt email",
      message: message
    });
  });
  module.exports = router; 