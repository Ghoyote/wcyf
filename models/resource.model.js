var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSchema = new Schema({
	title: {type:String,required:true,unique:true},
	description:{type:String,required:true},
	image:{type:String},
	podcast: {
		available: {type:Boolean,default:false},
		link:{type:String,default:null}
	},
	path: {
		type:String,
		required:true
	},
	date:{type: Date,default:Date.now}
});

module.exports = mongoose.model('resource', resourceSchema);
