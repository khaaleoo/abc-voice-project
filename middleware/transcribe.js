var request = require("request");
var formData = require("form-data");
var fs = require("fs");
exports.uploadSingleFile = (req, res, next) => {
  const url = "https://server-sound-api.herokuapp.com";
  let jsonData = '';
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  console.log("file", file);
  // request.post(
  //   {
  //     url: "https://server-sound-api.herokuapp.com",
  //     formData: {
  //       KEY: 'voice',
  //       VALUE: file
  //     }
  //   },
  //   function(err, res, body) {
  //     console.log("queo");
  //     console.log(body);
  //     console.log("queo");
  //   }
  // );
  var formData = {
    // Pass a simple key-value pair
    // my_field: "my_value",
    // // Pass data via Buffers
    // voice: Buffer.from(file)
    // // Pass data via Streams
    //voice: fs.createReadStream(file),
    // // Pass multiple values /w an Array
    // attachments: [fs.createReadStream(__dirname + "/attachment1.jpg")],
    // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
    // Use case: for some types of streams, you'll need to provide "file"-related information manually.
    // See the `form-data` README for more information about options: https://github.com/form-data/form-data
    voice: {
      value: file.buffer,
      options: {
        filename: file.originalname,
        contentType: file.mimetype
      }
    }
  };
  request.post({ url: url, formData: formData }, function(err, res, body) {
    if (err) {
      return console.error("upload failed:", err);
    }
    jsonData = body;
    console.log("Upload successful!  Server responded with:", body);
  });
  res.send(jsonData);
  res.render("transcribe/transcribe", {
    title: "Phiên dịch"
  });
};
exports.index = async (req, res, next) => {
  res.render("transcribe/transcribe", {
    title: "Phiên dịch"
  });
};
