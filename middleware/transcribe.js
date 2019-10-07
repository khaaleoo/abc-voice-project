var request = require("request");
exports.uploadSingleFile = async (req, res, next) => {
  let wdRes = res;
  let wdReq = req;
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
  // const form = new formData();
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
  //form.append(data);
  request.post({ url: url, formData: formData }, async (err, res, body) => {
    if (err) {
      return console.error("upload failed:", err);
    } else {
     // window.unescape = window.unescape || window.decodeURI;
      jsonData = JSON.parse(body); //body la api json
      // jsonData = jsonData.split('"text":"').pop();
      // jsonData = jsonData.split('"}');
      // let data = JSON.parse(body);
      //let t = utf8.encode(jsonData[0]);
      console.log("Upload successful!  Server responded with:", jsonData);
      //var str = "qua sinh bu\u1ed5i kh\u1ed5 t\u1ee9c h\u1ed3 \u0111\u1ee7 v\u1ec1\n";
      //str += unescape(escape(jsonData[0]));
      //var str_esc = escape(str);
      // document.write(str_esc + "<br>");
      // document.write(unescape(str_esc));
      // console.log("str", str.toString());
      // console.log("json", data["text"]);
      // console.log("compare", str.toString() == jsonData[0]);
      //wdRes.send(jsonData[0].toString("utf8"));
      //wdRes.send(jsonData)
      
      wdReq.session.file = file;
      wdReq.session.jsonData =  jsonData["text"];
      wdRes.redirect("/transcribe");
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
  let jsonData = '';
  let descriptionFile = ''
  if(req.session.file)
  {
    jsonData = req.session.jsonData;
    descriptionFile = req.session.file.originalname;
  }
  res.render("transcribe/transcribe", {
    title: "Phiên dịch",
    jsonData: jsonData,
    descriptionFile: descriptionFile
  });
};
