const User = require('../../models/user').User;
const AuthError = require('../../models/user').AuthError;
const createError = require('http-errors');

exports.get = (req, res, next) => {

  User.findById({_id: req.params.id}, (err, user) => {
    if (err) {
      if (err instanceof AuthError) {
        return next(createError(403))
      } else {
        return next(err);
      }
    }
    res.json({
      error: null,
      statusCode: 200,
      user
    })
  });
};
