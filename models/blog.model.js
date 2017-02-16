var SchemaObject = require('schema-object');

var blog = new SchemaObject({
	title:{
		type: String,
		required: true,
		unique: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		required:true
	},
	author: {
		type: String,
		default: 'Ebenezer'
	}
});

module.exports = blog;
