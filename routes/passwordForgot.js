var express = require("express");
var router = express.Router();
var userModel = require("../model/user.model");
var bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const user = "soundapihcmus@gmail.com"
const password = "Cotroimoibiet1";
/* GET emailForgot page. */
router.get("/", function(req, res, next) {
  res.render("passwordforgot/passwordForgot", { title: "Email Forgot" });
});

/* GET email requst notification page. */
router.get("/nortificationRequest", function(req, res, next) {
  res.render("passwordforgot/notificationRequest", {
    title: "Email Request Notification",
    layout: "../views/layout"
  });
});

/* GET input new password page. */
router.get("/newPassword", function(req, res, next) {
  res.render("passwordforgot/newPassword", {
    title: "New Password",
    layout: "../views/layout",
    email: req.user.email
  });
});
const smtpTransport = nodemailer.createTransport({
  host: "gmail.com",
  service: "Gmail",
  auth: {
    user: user,
    pass: password
  }
});
const sendmailRecover = async (req, res,email) => {
  const token = await bcrypt.hash(req.body.email,0);

  const link="http://"+req.get('host')+"/recoverPassword?id="+token;
  const mailOptions={
      to : email,
      subject : "Phục hồi tài khoản shop master",
      html : "Chào bạn!,<br> Hãy click vào đường dẫn bên dưới để phục hồi mật khẩu tài khoản Shop Master<br><a href="+link+">Click để phục hồi</a>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
          res.end("error");
      }else{
          console.log("Message sent: " + response.message);
          res.end("sent");
      }
  });
  return token;
};
router.post("/", async (req, res, next) => {
  const email = req.body.email;
  var token = "";
  var notify = "CHÚNG TÔI RẤT TIẾC !!!";
  var message =
    "Có vẻ như tài khoản của bạn không tồn tại, hoặc chưa được kíck hoạt với bất cứ email nào :( !!!";
  const user = await userModel.findByEmail(email);
  console.log("user------",user);
  console.log("email----",email)
  if (!user.error) {
    notify = "HÃY CHECK EMAIL CỦA BẠN !!!";
    message =
      "Chúng tôi đã gửi thư đến email của bạn, hãy làm theo hướng dẫn trong thư để lấy lại mật khẩu nhé ^^!";
    token = await sendmailRecover(req, res, email);
    const entity=user.data;
    entity.token=token;
    userModel.addRecoverToken(entity)
    .then(r=>res.redirect("forgotPassword/nortificationRequest"))
    .catch(e=>next(e))
  }
  else {
    res.send(message);
  }
});
module.exports = router;
