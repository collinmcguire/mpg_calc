
/*

Vehicle API 

*/

var received = 'Received the data, thank you!';
var mongo = require('mongodb');
var format = require('util').format;
var dateTime = new Date();


exports.add = function(req, res){
	res.send(received);

	var stats = {
		year: req.body.year,
		make: req.body.make, 
		model: req.body.model,
		dateTime: dateTime
	};

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err;

		var collection = db.collection('vehicles');
		
		collection.insert(stats, function(err, docs){
			console.log(' Items were inserted');
		});

	});

};

exports.view_multi = function(req, res){
	mongo.connect('mongodb://23.21.228.204:27017/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicles');

		collection.find({}).toArray(function(err, results){
			res.send(results);
		});
	});
};

exports.view_single = function(req, res){
	var id = new mongo.ObjectID( req.param('id') );
	console.log(req);
	console.log('The id is ' + id); 

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicles');

		collection.find({_id: id}).toArray(function(err, results){
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
			else console.log(object);
		});
	});
	res.send('Deleted');
};