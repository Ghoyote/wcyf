var express = require('express');
var router = express.Router();
var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

/* GET home page. */
router.get('/blog', function (req, res, next) {
	res.render('make-blog',
		{
			title: process.env.HEADING_ADMIN_MAKE_BLOG
		});
});

router.post('/create-blog-post', function (req, res, next) {
	var cont = req.body.content;
	res.send(cont);
	console.log(cont);
});

module.exports = router;