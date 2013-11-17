
/*
 * GET home page.
 */

 var title = 'MPG Calc',
	 response = 'Received it, thank you!';

exports.home = function(req, res){
  	res.render('index', {title: title});
};

exports.add_vehicle = function(req, res){
	res.render('add_vehicle', {title: title});
};

exports.view_vehicle = function(req, res){
	res.render('view_vehicle', {title: title});
}

