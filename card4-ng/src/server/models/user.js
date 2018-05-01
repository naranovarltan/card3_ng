const crypto = require('crypto');
const async = require('async');
const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;
const util = require('util');

let schema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  firstname:{
    type: String
  },
  lastname:{
    type: String
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(login, password, callback) {
  const User = this;
  async.waterfall([
    (callback) => {
      User.findOne({login: login}, callback)
    },
    (user, callback) => {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user)
        } else {
          callback( new AuthError("Пароль неверен"));
        }
      } else {
        callback( new AuthError("Пользователя нет"))
      }
    }
  ], callback);
};

schema.statics.registration = function (user, callback) {
  let User = this;

  async.waterfall([
    (callback) => {
      User.findOne({login: user.login}, callback);
    },
    (userData, callback) => {
      if (!userData) {
        if (user.password) {
          let newUser = new User(
            {
              login: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              password: user.password
            }
          );
          newUser.save((err) => {
            if (err) return callback(err);
            callback (null, newUser);
          });
        } else {
          callback(new AuthError("пароль пуст"));
        }
      } else {
        callback(new AuthError("Пользователь уже занят"));
      }
    }
  ], callback);
};

exports.User = mongoose.model('User', schema);


function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message || http.STATUS_CODES[status] || 'Error';
}

util.inherits(AuthError, Error);

AuthError.prototype.name = "AuthError";

exports.AuthError = AuthError;
