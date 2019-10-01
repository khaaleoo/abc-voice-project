var express = require('express');
var router = express.Router();
var userModel = require('../../model/user.model');
/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login/login', { title: 'Login' });
});
router.post('/', async (req, res, next) => {
  console.log('req.body-------', req.body);
  const user = await userModel.login(req.body.email, req.body.password);
  console.log('userModel--------', user);
  if (user.length < 1) {
    res.render('error');
  } else {
    res.render('index', { title: 'Express' });
  }
});
module.exports = router;
