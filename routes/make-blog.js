var express = require('express');
var router = express.Router();
var Resource = require('../models/resource.model');
var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	
	
	
	/* GET home page. */
	router.get('/blog', function (req, res, next) {
		res.render('make-blog',
			{
				title: process.env.HEADING_ADMIN_MAKE_BLOG
			});
	});
	
	router.post('/create-blog-post', function (req, res, next) {
		var resdets = req.body;
		var newResource = new Resource({
			title:       resdets.title,
			description: resdets.description,
			image:       resdets.image,
			podcast:     {
				// available: resdets.pod,
				link: resdets.podcast
			},
			path:        resdets.content
		});
		newResource.save(function (err, resource) {
			if ( err ) {
				console.error(err.message)
				res.json(err);
			} else {
				console.log("Saved!")
				res.json(resource);
			}
		});
		
	});
});
module.exports = router;
