
/*
 * GET home page.
 */

 var title = 'MPG Calc';

exports.index = function(req, res){
  res.render('index', { title: title});
};

exports.view = function(req, res){
	res.render('view', {title: titel});
};

exports.vehicle = function(req, res){
	console.log(req.body);
}