const database = require("./config");

const express = require("express");

const app = express();
const configureExpress = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

module.exports = database.authenticate().then(configureExpress);