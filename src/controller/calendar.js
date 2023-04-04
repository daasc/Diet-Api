const modelCalendar = require("../models/calendar");
class CalendarController {
  constructor() {
    this.db =  modelCalendar;
  }

  async store(Dao) {
    try {
      const calendar = new modelCalendar(Dao);
      await calendar.save()
    } catch (error) {
      throw Error(error);
    }
  }

  async get() {
    try {
      const result = await this.db.find({});
      return result;
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = CalendarController;
