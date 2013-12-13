/*

Vehicle API 

*/

var received = 'Received the data, thank you!',
	mongo = require('mongodb'),
	color = require('color'),
	format = require('util').format;

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
		make: data.make.toLowerCase(), 
		model: data.model.toLowerCase(),
		year: parseFloat(data.year),
	};


	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err;

		db.collection('vehicles').find({ tags: [ vehicle.make, vehicle.model ] }).toArray(function(err, docs){
				if(docs == '' ){
					db.collection('vehicles').insert({
						'make': vehicle.make,
						'model': vehicle.model, 
						'years': [vehicle.year],
						'tags': [vehicle.make, vehicle.model],
						'date added': new Date(),
						'stats': [],
						'log': [{'date': new Date(), 'action': 'add', 'what': 'vehicle'}]
					}, function(err, docs){
						console.log('Added: ');
						console.log(docs);
					});
				} else { 
					var match;

					for(var i=0;i<docs[0].years.length;i++){
						match = false;

						if(vehicle.year == docs[0].years[i]){
							match = true;
							console.log('Found match');
							break;
						} else{
							console.log('No match found');
						}
					}

					if(match){
						console.log('The vehicle year is already saved');
					} else {
						console.log('Adding to DB');
						db.collection('vehicles').update(
							{
								'_id': docs[0]._id,
							},
							{
								$push: {
									'years': vehicle.year,
									'log': {
										'date': new Date(),
										'action': 'added',
										'what': 'a new year'
									}
								}
							}, function(err, docs){
								if (err) throw err;
							});
					} // End if..then...
				} // End if...then..
			}); // End adding to vehicles
		}); // End mongo.connect();
}; // End .add();

exports.view_multi = function(req, res){
	mongo.connect('mongodb://23.21.228.204:27017/mpg_calc', function(err, db){
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
	
	mongo.connect('mongodb://23.21.228.204:27017/mpg_calc', function(err, db){
		if(err) throw err; 

		db.collection('vehicles').find({'_id': id}).toArray(function(err, results){
			console.log(results);
			res.send(results);
		});
	});

};
	
exports.delete = function(req, res){
	
	var id = new mongo.ObjectID(req.body.id);

	console.log(id);

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
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

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		db.collection('vehicles').find().toArray(function(err, results){
			var makes = findMatch(results, 'make');
			res.send(makes);
		});
	});
};

exports.models = function(req, res){
	var make = req.param('make').toLowerCase();

	console.log('Searching for models');

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
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

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		db.collection('vehicles')
			.find(query)
			.toArray(function(err, results){
				res.send(results[0].years);
		});
	});
};