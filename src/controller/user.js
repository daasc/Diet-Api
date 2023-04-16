const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class User {
  constructor() {
    this.userDb = userModel;
  }

  async register(user) {
    try {
      const hasUser = await this.userDb.findOne({ email: user.email });
      if (hasUser) {
        throw new Error("User existed!");
      }
      const newUser = new userModel({
        email: user.email,
        password: user.password,
        username: user.username,
      });
      return newUser.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async authenticate(login) {
    try {
      const user = await this.userDb.findOne({ email: login.email });
      if (!user || !bcrypt.compareSync(login.password, user.password)) {
        throw new Error("Username ou senha estão incorretas!");
      }
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        }
      );

      return {
        token,
        data: {
          email: user.email,
          id: user._id
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = User;
