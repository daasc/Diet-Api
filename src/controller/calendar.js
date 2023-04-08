const modelCalendar = require("../models/calendar");
class CalendarController {
  constructor() {
    this.db = modelCalendar;
  }
  defaultCalender() {
    const defaultCalender = {
      Breakfast: [],
      Snack: [],
      Lunch: [],
      "Afternoon Snack": [],
      Dinner: [],
    };
    for (const key in defaultCalender) {
      for (let index = 0; index < 6; index++) {
        defaultCalender[key].push([
          {
            empty: true,
          },
        ]);
      }
    }

    return defaultCalender;
  }
  async store(meal) {
    try {
      let calendar = await this.findOne();
      let week = calendar?.week;
      if (!week) {
        week = this.defaultCalender();
      }
      if (week[meal.meal][parseInt(meal.day)][0]?.empty) {
        week[meal.meal][parseInt(meal.day)] = [meal];
      } else {
        week[meal.meal][parseInt(meal.day)].push(meal);
      }
      console.log(week[meal.meal][parseInt(meal.day)]);
      console.log(week[meal.meal]);
      await this.db.updateOne(
        { _id: calendar._id },
        { week: week },
        { new: true }
      );
    } catch (error) {
      console.log(error);
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

  async findOne() {
    try {
      const curr = new Date();
      const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      const lastDay = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + 6)
      );
      console.log(firstDay, lastDay);
      const week = await this.db.findOne({
        createdAt: { $gte: firstDay, $lte: lastDay },
      });
      return JSON.stringify(week);
    } catch (error) {}
  }
}

module.exports = CalendarController;
