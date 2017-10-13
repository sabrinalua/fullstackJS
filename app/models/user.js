var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type:String,
		unique: true,
		required: true,
		trim:true,
	},
	username:{
		type: String,
		unique:true,
		required:true,
		trim:true,
	},
	password: {
		type:String,
		required:true
	},
	meta:{
		location:String,
		gender: {
			type:String,
			enum:['male','female','dragon'],
			default: 'dragon'
		}
	},
	pictures:{
		ori: {
			type:String,
			default: null
		},
		preview: {
			type: String,
			default: null
		}
	},
	info:{
		last_name: String,
		first_name: String,
		birthday: Date,
		bio: String
	},
	settings:{
		private: {
			type: Boolean,
			default: 0 //public by default
		},
		receive_notification:{
			type: Boolean,
			default :1 ////receive notifications by default
		}
	},
	profile_set :{
		type: Boolean,
		default: 0 //default not set
	},
	updated_at:Date,
	created_at:Date
});

UserSchema.pre('save', function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;