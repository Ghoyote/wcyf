var express = require('express');
var router = express.Router();
var Resource = require('../models/resource.model');
var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
var mongoose = require('mongoose');
var Dropbox = require('dropbox');
var path = require('path');

var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	/* GET home page. */
	router.get('/blog', function (req, res, next) {
		res.render('make-blog',
			{
				title: process.env.HEADING_ADMIN_MAKE_BLOG
			});
	});
	
	router.post('/create-blog-post', function (req, res, next) {
		var resdets = req.body;
		var contents = resdets.content;
		var image = resdets.image;
		var imagename = path.format({
			dir:  '/images/',
			name: req.body.title.toLowerCase().trim().split(/[\s,.]+/).join('_'),
			ext:  path.extname(image)
		});
		var filename = path.format({
			dir:  '/blog-posts/',
			name: req.body.title.trim().toLowerCase().split(/[\s,.]+/).join('_'),
			ext:  '.html'
		});
		var newResource = new Resource({
			title:       resdets.title,
			description: resdets.description,
			// image:       ,
			podcast:     {
				// available: resdets.pod,
				link: resdets.podcast
			}
		});
		var dbxCont = [
			{ path: filename, contents: contents },
			{ path: imagename, contents: image }
		];
		dbx.filesUpload(dbxCont.forEach(function (item) {
			return {
				path:     item.path,
				contents: item.contents
			}
		})).then(function (response) {
			newResource.path = '/blog-posts/' + filename;
			newResource.image = imagename;
			console.log(response);
		}).catch(function (err) {
			console.log(err);
			res.send(err);
		});
		/*dbx.filesUpload({path: '/images/'+imagename, contents:contents}).then(function (response) {
		 newResource.image = '/blog-posts/'+imagename;
		 console.log(response);
		 }).catch(function (err) {
		 console.log(err);
		 })*/
		
		newResource.save(function (err, resource) {
			if ( err ) {
				console.error(err.message);
				res.json(err);
			} else {
				console.log("Saved!");
				res.json(resource);
			}
		});
		
	});
});
module.exports = router;
