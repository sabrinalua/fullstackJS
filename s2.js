var express = require('express'),
	app = express(),
	bp = require('body-parser'),
	db = require('mongodb'),
	router = express.Router(),
	port = process.env.PORT || 3000,
	constants = require('./config/params'),
	dbUrl = constants.dbUrl,
	MongoClient = db.MongoClient,
	mongoose= require('mongoose');
	
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl,{ useMongoClient: true })
// var User = require('./app/models/UserModel'), 
// 	UserCred = require('./app/models/UserLogin');

var routes = require('./routes');
routes(app);

app.listen(port);
console.log("anonymo running at port"+port);
