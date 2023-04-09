const { Schema, model } = require('mongoose');

const CalendarModel = new Schema({
  week: {
    type: Map,
    required: true,
  },
}, { timestamps: true })

module.exports = model('calendar', CalendarModel);