const database = require("./config");

const express = require("express");
const router = require("./router");

const app = express();
const configureExpress = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", router);

  return app;
};

module.exports = database().then(() => configureExpress());