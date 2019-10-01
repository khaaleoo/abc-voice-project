var express = require('express');
var router = express.Router();
var userModel = require('../../model/user.model');
/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login/login', { title: 'Login' });
});
router.post('/', async (req, res, next) => {
  const user = await userModel.login(req.body.email, req.body.password);
  if (user.length < 1) {
    res.render('error');
  } else {
    res.render('index', { title: 'Express' });
  }
});
module.exports = router;
