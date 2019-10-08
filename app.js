var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var transcribeRouter = require("./routes/transcribe");
var app = express();


//
require("./middleware/session")(app);
require("./middleware/passport")(app);



var hbs = require( 'express-handlebars' );

app.engine( 'hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/',
  partialsDir: __dirname + '/views/partials/'
} ) );

app.set( 'view engine', 'hbs' );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// setting
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./routes/genarateKey"))
//routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/logout", require("./routes/logout"));
app.use("/register", registerRouter);
app.use("/dadangnhap", indexRouter);
app.use("/transcribe",transcribeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { layout: false, err });
});

var server = app.listen(8000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(
    "Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s",
    host,
    port
  );
});
module.exports = app;
