var express = require("express");
var router = express.Router();
var userModel = require("../model/user.model");
var bcrypt = require("bcrypt");
/* GET register page. */
router.get("/", function(req, res, next) {
  res.render("register/register", { title: "register" });
});

router.post("/", async (req, res, next) => {
  if (req.body) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send("/thieuparam");
      return;
    }
    const email_user = await userModel.findByEmail(email);
    console.log(email_user);
    if (email_user.length > 0) {
      res.send("/usernamedatontai");
    } else {
      const data = {
        email,
        password: bcrypt.hashSync(password, 10),
        role: "user",
        name: "NoName"
      };
      try {
        const useradd = await userModel.add(data);
        if (useradd) {
          res.redirect("/");
        } else {
          res.send("/thatbai");
        }
      } catch (e) {
        next(e);
      }
    }
  } else {
    res.send("/thieuparam");
  }
});
module.exports = router;
