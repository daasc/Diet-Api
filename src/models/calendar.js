const { Schema, model } = require('mongoose');

const CalendarModel = new Schema({
  week: {
    type: String,
    required: true,
  }
})

module.exports = model('calendar', CalendarModel);