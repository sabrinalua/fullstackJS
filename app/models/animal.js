//example of javascript class

function Animal(name){
	this.name= name;
}

Animal.prototype.move = function(meters){
	console.log(this.name+" moved "+meters+" m!");
}