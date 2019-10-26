var express = require("express");
var router = express.Router();
var userModel = require("../model/user.model");
router.get("/", async (req, res, next) => {
  var message = "Lỗi xác thực";
  const user = await userModel.verifyRecoverToken(req.query.id);
  if (user.length > 0) {
    console.log("enter recoverpassword zone");
    message = "";
    const email = user.email;
    res.redirect("passwordforgot/newPassword")
    res.render("passwordforgot/newPassword", {
      title: "Khôi phục mật khẩu",
      message: message,
      email
    });
  } else {
    console.log("cannot enter recoverpassword zone");
    res.send(message);
  }
});
router.post("/", async (req, res, next) => {
  console.log(req.body.update_password);
  await userModel.changePassword(req.body.email, req.body);

  res.redirect("./login");
});
module.exports = router;
