var express = require("express");
var router = express.Router();

/* GET emailForgot page. */
router.get("/", function(req, res, next) {
  res.render("passwordForgot/passwordForgot", { title: "Email Forgot"});
});

/* GET email requst notification page. */
router.get("/nortificationRequest", function(req, res, next) {
  res.render("passwordForgot/nortificationRequest", { title: "Email Request Notification", layout: '../views/layout'});
});

/* GET input new password page. */
router.get("/newPassword", function(req, res, next) {
  res.render("passwordForgot/newPassword", { title: "New Password", layout: '../views/layout'});
});

module.exports = router;