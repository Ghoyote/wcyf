var express = require('express');
var router = express.Router();
var MailIn = require('../models/email.model');
var date=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: process.env.HEADING_WCYF
  });
});
router.post('/sendmail', function (req, res, next) {
	MailIn = req.body;
	MailIn.date = date;
	console.log(MailIn);
	res.redirect('/');
});
module.exports = router;
