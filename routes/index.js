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
	var newMail = new MailIn({
		name: req.body.name,
		email:req.body.email,
		category:req.body.category,
		date: date,
		message:req.body.message
	});
	
	console.log(newMail);
	res.send(newMail);
});
module.exports = router;
