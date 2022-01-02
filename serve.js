const express = require("express");
const app = express();
const routers = require("./routers");
const mongoose = require("mongoose");
const HttpStatusCode = require("http-status-codes");

app.get("/", function (req, res) {
  res.json("MongoDb");
});

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }, () =>
  console.log("Connected to db !")
);

app.use(routers.authRouter);
app.use(routers.userRouter);

app.use((req, res, next) => {
  res.status(HttpStatusCode.NOT_FOUND).send("404 NOT FOUND");
});

module.exports = app;
