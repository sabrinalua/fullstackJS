var http = function(status, error, message){
	this.status = status;
	this.error=error;
	this.message = message;

};

module.exports = http;