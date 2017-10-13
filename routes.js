'use strict';
var bp = require('body-parser');
var jsonParser = bp.json();
var urlencodedParser = bp.urlencoded({ extended: false });
var fileUpload = require('express-fileupload');
var lodash = require("lodash");

var error = require('./app/models/http-error-response.js');
var middleware = require('./middleware.js');
var Util = require('./app/models/util.js');
var User = require("./app/models/user.js");

var multer = require('multer');
var upload = multer({dest: './uploads/'});
var registerFields = upload.fields([
	{ name: 'username', maxCount: 1 }, 
	{ name: 'email', maxCount: 1 }, 
	{ name: 'password', maxCount: 1 }
	]);
var loginFields = upload.fields([
	{ name: 'username', maxCount: 1 }, 
	{ name: 'password', maxCount: 1 }
	]);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
  	cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
});
var uploadFile = multer({ storage: storage });

// controllers
var usercontroller = require('./app/backend/users.js');

module.exports = function(app){

	app.get('/', function(req,res){
		res.sendFile(__dirname+'/app/frontend/views/index.html');
	});

	app.get('/mw'/*,[middleware.head, middleware.auth]*/, function(req,res){
		var k = Util.generate_session_token('1','2');
		res.send(k);
		// res.send("mw1");
	});

	app.post('/api/login', loginFields, usercontroller.authenticate);

	app.post('/api/register', [registerFields,middleware.head],usercontroller.register);

	app.route('/api/posts')
		.get([middleware.auth],function(req,res){
			res.send("get posts");
		})
		.post([uploadFile.single('avatar'), middleware.auth], function(req, res){
			if(req.file.fieldname=="avatar" && req.body.xx){
				
				res.send("ya");
				console.log(req.body.xx)
			}else{
				res.send("neyt")
			}
		})
		.put(jsonParser, function(req,res){
			res.send(req.body)
		});

}