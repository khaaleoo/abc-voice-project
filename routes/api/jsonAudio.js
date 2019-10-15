var express = require("express");
var router = express.Router();
var keyModel = require("../../model/key.model");
var passport = require("passport");

router.post('/', async (req,res,next) => {
    const id = req.body.key;
    const getKey = await keyModel.singleById(id);
    if (getKey.length > 0) {
        res.send('api OK');
    } else {
        res.send('api key not correct');
    }
});

module.exports = router;