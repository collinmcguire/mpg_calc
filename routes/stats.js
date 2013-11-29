/*

Stats API 

*/

var response = 'Received the data, thank you!',
	mongo = require('mongodb'), 
	format = require('util').format;

exports.makes = function(req, res){
	console.log('Searching for makes!');

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicle_stats');

		collection.find().toArray(function(err, results){
			if (err) throw err;

			console.log(results);

			var makes = [], 
				match;

			for(var i=0;i<results.length;i++){
				match = false;
				for(var j=0;j<makes.length;j++){
					if(results[i].vehicle.make == makes[j]){
						match = true;
						break;
					}
				}

				if(match){} else{
					makes[makes.length] = results[i].vehicle.make;
				}
			}

			res.send(makes);

		});
	});
};

exports.models = function(req, res){
	console.log('Searching for models!');

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicle_stats');

		collection.find().toArray(function(err, results){
			if (err) throw err;

			console.log(results);

			var models = [], 
				match;

			for(var i=0;i<results.length;i++){
				match = false;
				for(var j=0;j<models.length;j++){
					if(results[i].vehicle.model == model[j]){
						match = true;
						break;
					}
				}

				if(match){} else{
					models[models.length] = results[i].vehicle.model;
				}
			}

			res.send(models);

		});
	});
};

exports.years = function(req, res){
	console.log('Searching for makes!');

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicle_stats');

		collection.find().toArray(function(err, results){
			if (err) throw err;

			console.log(results);

			var years = [], 
				match;

			for(var i=0;i<results.length;i++){
				match = false;
				for(var j=0;j<years.length;j++){
					if(results[i].vehicle.year == years[j]){
						match = true;
						break;
					}
				}

				if(match){} else{
					years[years.length] = results[i].vehicle.year;
				}
			}

			res.send(years);

		});
	});
};

exports.view_multi = function(req, res){
	console.log('Looking for all the stats!');

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err;

		var collection = db.collection('vehicle_stats');

		collection.find().toArray(function(err, results){
			console.log(results);
			res.send(results);
		});
	});
};

exports.view_single = function(res, res){
	var id = new mongo.ObjectID(req.param('id'));

	console.log('Looking for' + id);
	res.send(response);

};

exports.add = function(req, res){
	var stats = req.body; 
	console.log('Received');

	mongo.connect('mongodb://23.21.228.204:27017/mpg_calc', function(err, db){
		if (err) throw err;

		var collection = db.collection('vehicle_stats');

		collection.insert(stats, function(err, docs){
			console.log('Saved');
			res.send(response);
		});

	});

};
exports.delete = function(req, res){
	
	var id = new mongo.ObjectID(req.body.id);

	console.log(id);

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicle_stats');

		collection.findAndModify({_id : id }, [['_id', 'asc']], {}, {remove: 'true'}, function(err, object){
			if (err) console.warn(err.message);
			else console.log(object);
		});
	});
	res.send('Deleted');
};
