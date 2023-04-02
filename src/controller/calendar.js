class CalendarController {
  constructor() {
  }

  async store(Dao) {
    try {
      // await this.db.insertOne(Dao);
    } catch (error) {
      throw error;
    }
  }

  async get() {
    try {
      // const result = await this.db.find({}).toArray();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CalendarController;
