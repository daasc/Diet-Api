const { Router } = require("express");
const UserController = require("../controller/user");
const userController = new UserController();
const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    await userController.register(req.body);
    res.status(200).send('created!');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;