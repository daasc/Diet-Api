const { Router } = require("express");
const UserController = require("../controller/user");
const userController = new UserController();
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const result = await userController.register(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    const result = await userController.authenticate(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).send(error);
  }
});
module.exports = router;
