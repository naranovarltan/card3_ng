const User = require('../../models/user').User;
const AuthError = require('../../models/user').AuthError;

exports.post = function(req, res, next) {
  let user = req.body;

  User.registration(user, function(err, user) {
    if (err) {
      if (err instanceof AuthError) {
        return res.json({error: err.message});
      } else {
        return res.json({
          error: 'Пользователь с таки e-mail уже зарегистрирован',
          statusCode: 409
        });
      }
    } else {
      req.session.user = user._id;
      res.send({user});
    }
  });

};
