var request = require("request");
var keyModel = require('../model/key.model');
exports.uploadSingleFile = async (req, res, next) => {
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
      wdReq.session.jsonData =  jsonData["text"];
      wdRes.redirect("/transcribe");
    }
  });
};
exports.index = async (req, res, next) => {
  let jsonData = '';
  let descriptionFile = ''
  if(req.session.filename)
  {
    jsonData = req.session.jsonData;
    descriptionFile = req.session.filename;
  }
  res.render("transcribe/transcribe", {
    title: "Phiên dịch",
    jsonData: jsonData,
    descriptionFile: descriptionFile
  });
};