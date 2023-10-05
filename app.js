require("dotenv").config();
require("./models/connection");

<<<<<<< HEAD
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hashtagsRouter = require('./routes/hashtags');
=======
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var pwittsRouter = require("./routes/pwitts");
>>>>>>> 7b1c5378b73aeac4157f0b3c5430ec6d4621c92d

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hashtags', hashtagsRouter);
=======
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pwitts", pwittsRouter);
>>>>>>> 7b1c5378b73aeac4157f0b3c5430ec6d4621c92d

module.exports = app;
