
/**
 * Module dependencies.
 */

var express = require('express');
var site = require('./routes/index.js');
var vehicle = require('./routes/vehicle');
var stats = require('./routes/stats')
var http = require('http');
var path = require('path');
var	lessMiddleware = require('less-middleware');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**** API ******/

/* Vehicle */
app.post('/api/v1/vehicles/vehicle/add/', vehicle.add);
app.post('/api/v1/vehicles/vehicle/delete/', vehicle.delete);
app.get('/api/v1/vehicles/vehicle/view/:id', vehicle.view_single);
app.get('/api/v1/vehicles/vehicle/view/', vehicle.view);
app.get('/api/v1/vehicles/view/', vehicle.view_multi);
app.get('/api/v1/vehicles/makes/', vehicle.makes);
app.get('/api/v1/vehicles/years/*', vehicle.years);
app.get('/api/v1/vehicles/models/*', vehicle.models);

/* Stats */
app.post('/api/v1/stats/add/', stats.add);
/*app.post('/api/v1/stats/delete/', stats.delete);
app.get('/api/v1/stats/view/:id', stats.view_single);
app.get('/api/v1/stats/view/', stats.view_multi);
*/
/***** Web Pages ******/

app.get('/stats/view/', site.view_stats);
app.get('/vehicles/vehicle/add/', site.add_vehicle);
app.get('/vehicles/vehicle/view/:id', site.view_vehicle);
app.get('/vehicles/view/', site.view_vehicles);
app.get('/', site.home);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
