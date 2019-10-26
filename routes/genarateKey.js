var express = require("express");
var router = express.Router();
var packageKeyModel = require('../model/packageKey.model');

var hat = require('hat');
var rack = hat.rack();
 function g(){
return rack();
}
 

/* GET home page. */
router.get("/genKey", function(req, res, next) {
    res.send(g())
});
router.get('/getListKeyPackage', async (req, res ,next) => {
    const listKey = await packageKeyModel.getAll();
    console.log('listKey', listKey);
    res.send(listKey);
});
module.exports = router;
