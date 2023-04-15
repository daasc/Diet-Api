const userModel = require("../models/user");
class User {
  constructor() {
    this.userDb = userModel;
  }

  async register(user) {
    try {

      const hasUser = await this.userDb.findOne({ email: user.email });
      console.log('cccacs', hasUser)
      if (hasUser) {
        console.log('entrei');
        throw new Error("User existed!");
      }
      console.log('dasds')
      const newUser = new userModel({
        email: user.email,
        password: user.password,
        username: user.username,
      });
      console.log(newUser);
      return newUser.save();

    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

module.exports = User;