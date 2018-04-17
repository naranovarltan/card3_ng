const express = require('express');
const app = express();

const config = require('./config');
const path = require('path');

const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionStore = require('./libs/sessionStore');

app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));

app.use(require('./middleware/loadUser'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

const server = app.listen(config.get('port'), () => {
  console.log('server connected on port ' + config.get('port'));
});

module.exports = app;
