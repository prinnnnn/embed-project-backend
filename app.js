const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
require('dotenv').config();

const AppError = require("./utils/appError");
const valuesRoutes = require("./routes/sensorsValRoutes");

const app = express();

const sessionOptions = {
  secret: "my-secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    // setting this false for http connections
    secure: false,
  },
};

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.static("static"));
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/values", valuesRoutes);
app.get("/", (req, res) => {
  res.send("Congratulation. This server is successfully run.");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;