require("dotenv").config();

module.exports = {
  url_connections:
    process.env.NODE_ENV !== "production"
      ? process.env.DB_EXTERNAL_URL_DEV
      : process.env.DB_EXTERNAL_URL,
};
