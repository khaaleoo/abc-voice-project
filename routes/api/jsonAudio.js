var express = require("express");
var router = express.Router();
var keyModel = require("../../model/key.model");
var passport = require("passport");

var request = require('request');
// packages upload file
const multer = require("multer");

// SET STORAGE
var storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/wav") {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file .wav'), false);
    }
};
var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


router.post("/uploadfile", upload.single("myFile"), async (req, res, next )=> {
    let wdRes = res;
    let wdReq = req;
    const url = "https://server-sound-api.herokuapp.com";
    let jsonData = "";
    const file = req.file;
    console.log('req.body0--------', req.body);
    const apiKey = req.body.apiKey;
    const rows = await keyModel.singleById(apiKey);
    console.log('rrowsss---', rows);
    console.log('reow.length------', rows.length);
    if (rows.length === 0) {
        console.log('hahahahahha');
        const error = new Error("API KEY invalid");
        error.httpStatusCode = 400;
        return next(error);
    }
    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    console.log("file", file);
    var formData = {
        voice: {
            value: file.buffer,
            options: {
                filename: file.originalname,
                contentType: file.mimetype
            }
        }
    };
    //form.append(data);
    request.post({ url: url, formData: formData }, async (err, res, body) => {
        if (err) {
            return console.error("upload failed:", err);
        } else {
            jsonData = JSON.parse(body);
            console.log("Upload successful!  Server responded with:", jsonData);
            wdReq.session.filename = file.originalname;
            wdReq.session.jsonData = jsonData["text"];
            wdRes.redirect("/transcribe");
        }
    });
});
router.post('/', async (req,res,next) => {
    const id = req.body.key;
    const getKey = await keyModel.singleById(id);
    if (getKey.length > 0) {
        res.send('api OK');
    } else {
        res.send('api key not correct');
    }
});

router.get('/', (req,res,next) => {
    let jsonData = '';
    let descriptionFile = ''
    if (req.session.filename) {
        jsonData = req.session.jsonData;
        descriptionFile = req.session.filename;
    }
    res.render("callApi/callapi", {
        title: "Phiên dịch",
        jsonData: jsonData,
        descriptionFile: descriptionFile
    });
});
module.exports = router;