var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MailIn = require('../models/email.model');
var date=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
var Resource =  require('../models/resource.model');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth:    {
		user: process.env.POSTMASTER,
		pass: process.env.POSTMASTER_KEY
	}
});



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	/* GET home page. */
	router.get('/', function (req, res, next) {
		res.render('index', {
			title: process.env.HEADING_WCYF
		});
	});
	
	router.post('/sendmail', function (req, res, next) {
		var newMail = new MailIn({
			name:     req.body.name,
			email:    req.body.email,
			category: req.body.category,
			date:     date,
			message:  req.body.message
		});
		var mailOptions = {
			sender: newMail.name,
			from:    newMail.name,
			to:      'evangeleben@gmail.com',
			subject: "New "+ newMail.category+ " request",
			replyTo: newMail.email,
			priority: 'high',
			html: "<blockquote>"+req.body.message+"<hr><br><small>Best<br>"+req.body.name+"</small></blockquote>"
		};
		transporter.sendMail(mailOptions, function (error, info) {
			if ( error ) {
				res.json(error.message);
				console.log(error);
			}else {
				console.log('Message sent\nid: %s\nresponse: %s', info.messageId, info.response);
				res.json("message sent successfully")
			}
		});
	});
	router.get('/getRes', function (req, res, next) {
		Resource.find({}).sort({ 'date': -1 }).limit(6).exec(function (err, results) {
			if ( err ) {
				res.send('an error has occurred' + err);
				console.log('an error has occurred' + err);
			}
			else {
				res.json(results);
			}
		});
	});
});

module.exports = router;
