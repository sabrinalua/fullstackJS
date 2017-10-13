var express = require('express'),
	app = express(),
	db = require('mongodb'),
	router = express.Router(),
	port = process.env.PORT || 3000,
	constants = require('./config/params'),
	dbUrl = constants.dbUrl,
	MongoClient = db.MongoClient,
	mongoose= require('mongoose');

mongoose.connect(dbUrl,{ useMongoClient: true })
// var User = require('./app/models/UserModel'), 
// 	UserCred = require('./app/models/UserLogin');

app.listen(port);

console.log('anonymo: '+port);

app.get('/', function(req, res){
	var user = new User({
		username: 'Tester C',
		password: 'tmp123',
	});
	user.save(function(err,product){
		if(err) {
			res.send({code: err.code, message: err.errmsg});
			res.status(404);
		}
		var cred = new UserCred({
			userLink: product._id,
			loginID: "123123",
			type: "phone",
			valid: 1
		})
		cred.save(function(err, x){
		if(err) throw err;
		console.log(product._id);
	});
	});
	
});

app.get('/1', function (req, res){
	
	var chris = new User({
		username: 'Tester A',
		password: 'tmp123',
	});

	chris.setAge(45);
	chris.save(function(err,product){
		if(err) res.send(err);
		res.json(product);

	});
	
})