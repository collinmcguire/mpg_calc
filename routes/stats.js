/*

Stats API 

Maybe one day soon I'll make a function that queries the database so I don't just have a copy and pasted database call
in within each method.

*/

var received = 'Received the data, thank you!',
	mongo = require('mongodb');

exports.add = function(req, res){
	var vehicle = req.body;

	// Display whats in the request body
	console.log('Received');
	console.log(vehicle);

	// Update vehicle's mpg then send it back
	vehicle.stats.mpg = (vehicle.stats.endMiles - vehicle.stats.startMiles) / (vehicle.stats.startFuel - vehicle.stats.endFuel);
	console.log(vehicle);
	res.send(''+vehicle.stats.mpg);
};
