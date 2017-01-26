var SchemaObject = require('schema-object');

var email = new SchemaObject({
	name: String,
	email: String,
	category: String,
	date: {
		type: Date,
		default: Date.now
	},
	message: String
},{
	keyIgnoreCase: true,
	strict: true
	}
);

module.exports = email;