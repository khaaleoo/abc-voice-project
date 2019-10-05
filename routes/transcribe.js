var express = require("express");
var router = express.Router();
var transcribe_middleware = require("../middleware/transcribe");
var request = require('request');
// packages upload file
const multer = require("multer");

// SET STORAGE
var storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/wav") {  
      cb(null,true);
  }else {
      cb(new Error('Chỉ chấp nhận file .wav'),false);
  }
};
var upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


router.get("/", transcribe_middleware.index);
router.post("/uploadfile", upload.single("myFile"), transcribe_middleware.uploadSingleFile);

module.exports = router;
