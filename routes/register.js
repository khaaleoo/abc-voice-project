var express = require("express");
var router = express.Router();
var userModel = require("../model/user.model");
var bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const user = "edogawaconanhuyx98@gmail.com"
const password = "Cotroimoibiet12";
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
    console.log(process.env.NODEMAILER_USER);
    if (email_user.length > 0) {
      res.send("/usernamedatontai");
    } else {
      const token = await sendmailActivate(req, res);
      const data = {
        email,
        password: bcrypt.hashSync(password, 10),
        role: "user",
        name: "NoName",
        token,
        isActivated:false
      };
      try {
        const useradd = await userModel.add(data);
        if (useradd) {
          res.redirect("/login");
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
const smtpTransport = nodemailer.createTransport({
  host: "gmail.com",
  service: "Gmail",
  auth: {
    user: user,
    pass: password
  }
});
const sendmailActivate = async (req, res) => {
  const email = req.body.email;
  const token = await bcrypt.hash(email, 0);

  const link = "http://" + req.get("host") + "/verify?id=" + token;
  const mailOptions = {
    to: email,
    subject: "Kích hoạt tài khoản Sound API",
    html:
      "Chào bạn!,<br> Hãy click vào đường dẫn bên dưới để xác thực email với tài khoản Sound Api<br><a href=" +
      link +
      ">Click để xác thực</a>"
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log("error------",process.env.NODEMAILER_PASSWORD);
      res.send(process.env.NODEMAILER_PASSWORD);
    } else {
      console.log("Message sent: " + response.message);
      res.send("sent mail to activate account. Please check your mail box");
    }
  });
  return token;
};
module.exports = router;
