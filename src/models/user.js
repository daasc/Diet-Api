const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email }).exec(function (err, user) {
//     if (err) {
//       return callback(err);
//     } else if (!user) {
//       const err = new Error("User not found.");
//       err.status = 401;
//       return callback(err);
//     }
//     bcrypt.compare(password, user.password, function (err, result) {
//       if (result === true) {
//         return callback(null, user);
//       } else {
//         return callback();
//       }
//     });
//   });
// };

module.exports = model("User", UserSchema);
