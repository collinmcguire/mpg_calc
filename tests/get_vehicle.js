var http = require('http');

var id = '52a80350024855c5b7000001';

var options = { 
	host: 'localhost', 
	port: '3000', 
	path: '/api/v1/vehicles/vehicle/view/' + id + '/',
	method: 'GET'
}

http.get(options, function(res){
	//res.setEncoding('UTF-8');
	res.on('data', function(chunk){
		console.log('Found' + chunk);
	})
});