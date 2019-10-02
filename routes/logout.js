var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth").user;
router.get("/", auth, function(req, res, next) {
  req.logOut();
  res.redirect("/dadangxuat");
});
module.exports = router;
