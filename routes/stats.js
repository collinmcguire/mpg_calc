/*

Stats API 

*/

var response = 'Received the data, thank you!';

exports.view = function(req, res){
	console.log(req.body);
	res.send(response);
};
