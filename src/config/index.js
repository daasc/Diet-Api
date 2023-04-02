
const config = require("./config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise

const connection = {
  uri: config.url_connections,
  options: {
    useNewUrlParser: true,
  },
}

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.')
})

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.')
})

module.exports = () => mongoose.connect(connection.uri, connection.options)