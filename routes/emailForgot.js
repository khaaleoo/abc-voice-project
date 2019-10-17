var express = require("express");
var router = express.Router();

/* GET emailForgot page. */
router.get("/", function(req, res, next) {
  res.render("forgotPassword/emailForgot", { title: "Email Forgot"});
});

module.exports = router;
