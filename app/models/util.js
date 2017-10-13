// function Util(){}

// const crypto= require('crypto');
// var random_uuid = function(){
// 	var id = crypto.randomBytes(16).toString("hex");
// 	return id;
// }

// Util.prototype.generate_session_token = function(loginid, deviceid){
// 	const algo='md5', key= 'cable';
// 	var data=random_uuid();
// 	// equivalent to $pk = hash_hmac(algo, data, key);
// 	var pk = crypto.createHmac(algo,key).update(data).digest('hex');
// 	var login_id = loginid.toLowerCase();
// 	var token = crypto.createHmac(algo,'').update(login_id+deviceid+pk).digest('hex'); 
// 	return token;
// }


// module.exports = Util;
const crypto= require('crypto');
var random_uuid= function(){
		var id = crypto.randomBytes(16).toString("hex");
		return id;
}
class Util{
	static generate_session_token(loginid,deviceid){
		const algo='md5', key= 'cable';
		var data=random_uuid();
		// equivalent to $pk = hash_hmac(algo, data, key);
		var pk = crypto.createHmac(algo,key).update(data).digest('hex');
		var login_id = loginid.toString().toLowerCase();
		var token = crypto.createHmac(algo,'').update(login_id+deviceid+pk).digest('hex'); 
		return token;
	}
}
module.exports = Util;
