var r = require('./app/models/http-error-response.js');
var multer = require('multer');
var upload = multer({dest: './uploads/'});


var middleware = {
	head : function(req,res,next){
		if(req.headers.dev_id && req.headers.app_id && req.headers.app_ver ){
			next();
		}else{
			var status = 406, code = 48963, message ="Insufficient/ invalid header parameters" ;
			var response = new r(status,code,message);
			res.status(status).send(response);
		}
	},
	auth : function(req, res, next){
		if(req.headers.nonymo_token){
			next();				
		}else{
			var status = 403, code = 48960, message ="Invalid access token" ;
			res.status(status).send(new r(status, code,message));
		}
	},
	mw2: function(req,res,next){
		if(req.query.name=='rabbit'){
			next();
		}else{
			res.send("name must be rabbit!");
		}
		
	}
};

module.exports = middleware;