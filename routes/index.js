var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('formUser');
});

//Get signup form
router.get('/formSignUser', function(req, res, next) {
  res.render('formSignUser');
});

//Get pressure form
router.get('/formPressure', function(req, res, next) {
  res.render('formCreatePressure');
});

module.exports = router;