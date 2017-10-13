'use strict';
var m = require('mongoose');
var Schema = m.Schema;

// {'title':'First Post', 'content':'This is the first Post', 'media': null, 'category': 'Text','_userId':1}
var PostSchema = new Schema({
	title: {
		type: String,
		required: ''
	},
	content: {
		type: String
	},
	media: {
		type: String,
		default: null
	},
	category: {
		type: [{
			type: String,
			enum: ['Text', 'Media']
		}],
		default: ['text']
	},
	Created_date: {
		type: Date,
		default: Date.now
	},

}); 

module.exports = m.model('Posts',PostSchema);