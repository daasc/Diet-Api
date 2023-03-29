require("dotenv").config();
module.exports = {
  url_connections: process.env.DB_EXTERNAL_URL,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: './src/__tests__/database.sqlite',
  define: {
    timestamps: true,
  },
};