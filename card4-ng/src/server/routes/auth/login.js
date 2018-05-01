const User = require('../../models/user').User;
const AuthError = require('../../models/user').AuthError;
const createError = require('http-errors');

exports.post = (req, res, next) => {
  let login = req.body.email;
  let password = req.body.password;

  User.authorize(login, password, (err, user) => {
    if (err) {
      if (err instanceof AuthError) {
        return next(createError(403))
      } else {
        return next(err);
      }
    }
    req.session.user = user._id;
    res.json({
      error: null,
      statusCode: 200,
      user
    }
    );
  });
};
