
/*
 * GET home page.
 */

exports.home = function(req, res){
	res.render('index', {title: 'home'});
};

exports.search = function(req, res){
	res.render('search', {title: 'search'});
};

exports.view_stats = function(req, res){
	res.render('view_stats', {title: 'stats'});
};

exports.add_vehicle = function(req, res){
	res.render('add_vehicle', {title: 'add'});
};

exports.view_vehicles = function(req, res){
	res.render('view_vehicles', {title: 'vehicles'});
};

exports.view_vehicle = function(req, res){
	res.render('view_vehicle', {title: 'vehicle', id: req.param('id') });
};

