var request = require("request");
var formData = require("form-data");
const utf8 = require("utf8");
var fs = require("fs");
var fetch = require("node-fetch");
var prettyjson = require("prettyjson");
exports.uploadSingleFile = async (req, res, next) => {
  let wdRes = res;
  const url = "https://server-sound-api.herokuapp.com";
  let jsonData = "";
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
  const form = new formData();
  var data = {
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
  //form.append(data);
  request.post({ url: url, formData: data }, async (err, res, body) => {
    if (err) {
      return console.error("upload failed:", err);
    } else {
      jsonData = body;
      jsonData = jsonData.split('"text":"').pop();
      jsonData = jsonData.split('"}');
      let data = escape(jsonData[0]);
      //let t = utf8.encode(jsonData[0]);
      console.log("Upload successful!  Server responded with:", body);
      var str = jsonData[0].toString();
      //var str_esc = escape(str);
      // document.write(str_esc + "<br>");
      // document.write(unescape(str_esc));
      console.log("str", str);
      console.log("json", jsonData[0].toString());

      wdRes.render("transcribe/transcribe", {
        title: "Phiên dịch",
        jsonData: unescape(data)
      });
      //wdRes.send(jsonData[0].toString("utf8"));
      //wdRes.send(jsonData)
      //wdRes.redirect("/transcribe");
    }
  });
  // console.log("code", jsonData.returncode);
  // fetch(url, { method: "POST", body: data })
  //   .then(res => res.json())
  //   .then(json => (jsonData = json));
  // res.send(jsonData);
  // res.render("transcribe/transcribe", {
  //   title: "Phiên dịch",
  //   jsonData: json
  // });
};
exports.index = async (req, res, next) => {
  res.render("transcribe/transcribe", {
    title: "Phiên dịch"
  });
};
