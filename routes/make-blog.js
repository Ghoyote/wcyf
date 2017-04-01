var express = require('express');
var router = express.Router();
var Resource = require('../models/resource.model');
var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
var mongoose = require('mongoose');
var Dropbox = require('dropbox');
var path = require('path');
var fs = require('fs');
var fileUpload = require('express-fileupload');

router.use(fileUpload());

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
	
	router.post('/blog/create', function (req, res, next) {
		
		var resdets = {
			title:       req.body.title,
			description: req.body.description,
			podcast:     {
				// available: resdets.pod,
				link: req.body.podcast.trim()
			},
			image:       req.files.image,
			content:     req.body.content
		};
		var content = resdets.content;
		var image = resdets.image.data;
		var fnm = resdets.title.trim().toLowerCase().split(/[\s,.]+/).join('_');
		var imagename = path.normalize(path.format({
			dir:  '/images/',
			name: fnm,
			ext:  path.extname(resdets.image.name)
		}));
		var filename = path.normalize(path.format({
			dir:  '/blog-posts/',
			name: fnm,
			ext:  '.html'
		}));
		console.log(filename + '\n' + imagename)
		var newResource = new Resource({
			title:       resdets.title,
			description: resdets.description,
			// image:       ,
			podcast:     {
				available: false,
				link:      resdets.podcast.link
			}
		});
		var dbxCont = [
			{ loc: filename, conts: content, type: 'text' },
			{ loc: imagename, conts: image, type: 'image' }
		];
		
		var itemsProcessed = 0;
		
		dbxCont.forEach(function (item, index, array) {
			dbx.filesUpload({ path: item.loc, contents: item.conts }).then(function (response) {
				if ( item.type == 'image' ) {
					newResource.image = imagename;
				} else if ( item.type == 'text' ) {
					newResource.path = filename;
				}
				console.log(response);
				if(index === array.length - 1) {
					newResource.save(function (err, resource) {
						console.log("mongo try save");
						if ( err ) {
							console.error(err.message);
							res.send(err.message);
						} else {
							console.log("Saved!");
							res.json(resource);
						}
					});
				}
			}).catch(function (err) {
				console.log(err);
				res.send("Big Error!")
			});
		});
		
		
		
	});
});
module.exports = router;
