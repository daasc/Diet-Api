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
      let week = calendar?.week ? JSON.parse(JSON.stringify(calendar.week)) : false;

      if (!week) {
        week = this.defaultCalender();
      }
      if (week[meal.meal][parseInt(meal.day)][0]?.empty) {
        week[meal.meal][parseInt(meal.day)] = [meal];
      } else {
        week[meal.meal][parseInt(meal.day)].push(meal);
      }
      if (!calendar?.week) {
        const calendar = new modelCalendar({ week });
        return calendar.save();
      }
      if (!!calendar?.week) {
        return this.db.updateOne(
          { _id: calendar._id },
          { $set: { week: week } }
        )
      }
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
      let firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      const lastDay = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + 6)
      );
      
      const nextDay = lastDay;
      if (curr.getDay() === 6) {
        firstDay = new Date(curr.setDate(curr.getDate() - 12))
      } 
      nextDay.setDate(lastDay.getDate() + 1);
      
      const week = await this.db.findOne({
        createdAt: { $gte: firstDay, $lte: nextDay },
      });

      return week;
    } catch (error) {}
  }
}

module.exports = CalendarController;
