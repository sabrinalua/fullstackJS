//user controller;

var mongoose = require("mongoose");
var lodash = require('lodash');
var User = require("../models/user.js");
var Response = require('../models/http-error-response.js');
var Util = require("../models/util.js");
const omit =['password','__v', '_id', 'created_at', 'updated_at'];


exports.register = function(req,res){
	if(req.body.username && req.body.email && req.body.password){
		var user = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});
		user.save(function(err, user){
			if(err){
				if(err.code==11000){
					res.status(403).send(new Response(403,0, "username/email already in use"));
				}
			}else{
				var clear = lodash.omit(user.toObject(), omit );
				res.send(clear);
			}
			
		});
	}else{
		var status = 403, code = 0, message ="insufficient parameters";
		var response = new Response(status,code,message);
		res.status(status).send(response);
	}
};

exports.authenticate = function(req,res){
	if(req.body.username && req.body.password){
		User.findOne({username:req.body.username, password: req.body.password }, function(err,user){
			if(err){res.send(err);}
			else{
				if(!user){
					res.status(403).send(new Response(403,1,'invalid login'));
				}else{
					var clear = lodash.omit(user.toObject(), omit);
					res.send({data: clear, auth: Util.generate_session_token(user._id, user._id)});
				}
			}
		})
	}else{
		var status = 403, code = 11000, message ="invalod login";
		res.status(status).send(new Response(status,code,message));
	}

};