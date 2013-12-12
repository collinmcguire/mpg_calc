var http = require('http'),
	querystring = require('querystring');

var	data = {
		id: '52a80350024855c5b7000001'
	},
	options = {
		host: 'localhost',
		path: '/api/v1/stats/add/?'+data, 
		query: 'test',
		port: '3000', 
		method: 'POST'
	}

var req = http.request(options, function(res){
	res.on('data', function(chunk){
		console.log(''+chunk);
	});
});

req.write(data.id);
req.end();

