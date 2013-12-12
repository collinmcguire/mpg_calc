/*

Stats API 

Maybe one day soon I'll make a function that queries the database so I don't just have a copy and pasted database call
in within each method.

*/

var received = 'Received the data, thank you!',
	mongo = require('mongodb');

exports.view_multi = function(req, res){
	console.log('Looking for all the stats!');

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err;

		var collection = db.collection('vehicle_stats');

		collection.find().toArray(function(err, results){
			console.log('Sending: ' + results);
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
	console.log(req.query);

	res.send('ok');
};
exports.delete = function(req, res){
	
	var id = new mongo.ObjectID(req.body.id);

	console.log(id);

	mongo.connect('mongodb://23.21.228.204/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicle_stats');

		collection.findAndModify({_id : id }, [['_id', 'asc']], {}, {remove: 'true'}, function(err, object){
			if (err) console.warn(err.message);
			else console.log('Deleted: ' + object);
		});
	});
	res.send('Deleted');
};
