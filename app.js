var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()

const db = require('./Models')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userRoutes = require ('./routes/userRoutes')
const pressureRoutes = require ('./routes/pressureRoutes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync().then(() => {
  console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)

//routes for the pressure API
app.use('/api/pressure', pressureRoutes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
