const config = require("./config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.url_connections, {
  dialect: config.dialect,
  protocol: config.dialect,
  dialectOptions: {
    ssl: {
      require: 'true'
    }
  }
});

module.exports = sequelize;