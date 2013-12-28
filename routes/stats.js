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
	vehicle.stats.mpg = (vehicle.stats.endMile - vehicle.stats.startMile) / (vehicle.stats.startFuel - vehicle.stats.endFuel);
	res.send(''+vehicle.stats.mpg);

	mongo.connect('mongodb://localhost/mpg_calc', function(err, db){
		db.collection("vehicles").update({
			"make": vehicle.make.toLowerCase(),
			"model": vehicle.model.toLowerCase(),
			"year": parseFloat(vehicle.year)
		},{
			$push:{
				"stats": {
				"mpg": vehicle.stats.mpg, 
				"year": vehicle.year,
				"date": new Date()
				}
			}
		}, function(err, docs){
			if(err) throw err;
			console.log(docs);
		});
	});
};
