/*

Vehicle API 

*/

var received = 'Received the data, thank you!',
	host = process.env.MONGOLAB_URI,
	mongo = require('mongodb'),
	color = require('color'),
	format = require('util').format;
console.log(host);

var findMatch = function(results, test){
	var data = [];

	for(var i=0;i<results.length;i++){
		var match;

		for(var j=0;j<data.length;j++){
			if(results[i][test] == data[j]){
				match = true;
				break;
			}
		}

		if(match){
			break;
		} else{
			data.push(results[i][test]);
		}
	}

	//res.send(data);
	return data
};

exports.add = function(req, res){
	res.send(received);

	var data = req.body;

	var vehicle = {
		"make": data.make.toLowerCase(), 
		"model": data.model.toLowerCase(),
		"year": parseFloat(data.year),
		"tags": [data.make, data.model, parseFloat(data.year)],
		"date added": new Date(),
		"stats": [],
		"log": [{'date': new Date(), 'action': 'add', 'what': 'vehicle'}]
	};


	mongo.connect(host, function(err, db){
		if(err) throw err;

		db.collection('vehicles').find({ tags: [ vehicle.make, vehicle.model, vehicle.year ] }).toArray(function(err, docs){
				if(docs == '' ){
					console.log("Did not find any vehicles");

					db.collection('vehicles').insert(vehicle, function(err, result){
						console.log('Added: ');
						console.log(result);
					});
				} else { 
					console.log("Vehicle is already in the database");
				} // End if...then..
		}); // End adding to vehicles
	}); // End mongo.connect();
}; // End .add();

exports.view_multi = function(req, res){
	mongo.connect(host, function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicles');

		collection.find().toArray(function(err, results){
			console.log(results)
			res.send(results);
		});
	});
};

exports.view_single = function(req, res){
	var id = new mongo.ObjectID( req.param('id') );
	console.log(id);
	
	mongo.connect(host, function(err, db){
		if(err) throw err; 

		db.collection('vehicles').find({'_id': id}).toArray(function(err, results){
			console.log(results);
			res.send(results);
		});
	});
};

exports.view = function(req, res){
	var vehicle = req.param('vehicle');
	vehicle.year = parseFloat(vehicle.year);

	mongo.connect(host, function(err, db){
		if(err) throw err;

		db.collection('vehicles').findOne(vehicle, function(err, results){
			if(err) throw err;

			console.log(results);
			res.send(results);
		});
	});
};
	
exports.delete = function(req, res){
	
	var id = new mongo.ObjectID(req.body.id);

	console.log(id);

	mongo.connect(host, function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicles');

		collection.findAndModify({_id : id }, [['_id', 'asc']], {}, {remove: 'true'}, function(err, object){
			if (err) console.warn(err.message);
			else console.log('Deleted: ' + object);
		});
	});

	res.send('Deleted');
};

exports.makes = function(req, res){
	console.log('Searching for makes!');

	mongo.connect(host, function(err, db){
		if(err) throw err; 

		db.collection('vehicles').find().toArray(function(err, results){
			var makes = findMatch(results, 'make');
			console.log(makes);
			res.send(makes);
		});
	});
};

exports.models = function(req, res){
	var make = req.param('make').toLowerCase();

	console.log('Searching for models');

	mongo.connect(host, function(err, db){
		if(err) throw err; 

		db.collection('vehicles').find({make: make}).toArray(function(err, results){
			var models = findMatch(results, 'model');
			res.send(models);
		});
	});
};

exports.years = function(req, res){
	var query = {
		"make": req.param("make"), 
		"model": req.param("model")
	};

	console.log('Looking for model years');

	mongo.connect(host, function(err, db){
		if(err) throw err; 

		db.collection('vehicles')
			.find(query)
			.toArray(function(err, results){
				console.log(results);
				var years = findMatch(results, 'year'),
					data = {"years": years, "id": new mongo.ObjectID(results._id)};
			console.log(data);
			res.send(data);
		});
	});
};