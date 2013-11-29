
/*
 * GET home page.
 */

 var title = 'MPG Calc',
	 response = 'Received it, thank you!',
	 http = require('http'),
	 mongo= require('mongodb');

exports.home = function(req, res){
	res.render('index', {title: title});
};

exports.view_stats = function(req, res){
	res.render('view_stats', {title: title});
};

exports.add_vehicle = function(req, res){
	res.render('add_vehicle', {title: title});
};

exports.view_vehicles = function(req, res){
	res.render('view_vehicles', {title: title});
};

exports.view_vehicle = function(req, res){
	var id = new mongo.ObjectID(req.param('id'));

	mongo.connect('mongodb://23.21.228.204:27017/mpg_calc', function(err, db){
		if(err) throw err; 

		var collection = db.collection('vehicles');

		collection.find({_id: id}).toArray(function(err, results){
			console.log(results);
			res.render('view_vehicle', {title: title, vehicle: results});
		});
	});
};

