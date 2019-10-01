var express = require('express');
var router = express.Router();
var userModel = require('../../model/user.model');
/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register/register', { title: 'register' });
});

router.post('/', async (req, res, next) => {
  if (req.body.password !== req.body.password_repeat) {
    res.render('error');
  } else {
    const email = await userModel.findByEmail(req.body.email);
    if (email.length > 1) {
      res.render('error');
    } else {
      const data = {
        email: req.body.email,
        password: req.body.password,
        role: 'user'
      }
      const useradd = await userModel.add(data);
      if (useradd) {
        res.render('index', { title: 'Express' });
      }
    }
  }
});
module.exports = router;
