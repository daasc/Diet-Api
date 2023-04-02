const { Router } = require("express");
const CalendarController = require("../controller/calendar");
const calendarController = new CalendarController();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await calendarController.get();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    await calendarController.store(req.body);
    res.status(200).send('created!');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;