var express = require("express");
var router = express.Router();
var userModel = require("../model/user.model");
var passport = require("passport");
/* GET login page. */
router.get("/", function(req, res, next) {
  res.render("login/login", { title: "Login" });
});
router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render("login/login", { title: "Login", info });
    }
    req.logIn(user, err => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);
module.exports = router;
