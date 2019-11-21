const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

// create the user schema.
const UserSchema = new Schema({
 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },

    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user',
    },
    phone: {
      type : String,
      required: true
    },
    isDeleted : {
      type : Boolean,
      default : false
    }
},
{ 
  timestamps: true,
   versionKey : false
  })
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
});

UserSchema.options.toJSON = {
  transform: function(doc,userData, options) {
      userData.id = userData._id;
      delete userData._id;
      delete userData.password;
      return userData;
  }
};
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
module.exports = mongoose.model("User", UserSchema, "users1");
