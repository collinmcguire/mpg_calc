
/*

Vehicle API 

*/

var received = 'Received the data, thank you!';

exports.add = function(req, res){
	console.log(req.body);
	res.send(received);
};

exports.view = function(req, res){
	res.send('Sending data...');
};