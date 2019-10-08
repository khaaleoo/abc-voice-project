var express = require("express");
var router = express.Router();


var hat = require('hat');
var rack = hat.rack();
 function g(){
return rack();
}
 

/* GET home page. */
router.get("/genKey", function(req, res, next) {
    res.send(g())
});

module.exports = router;
