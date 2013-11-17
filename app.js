
/**
 * Module dependencies.
 */

var express = require('express');
var site = require('./routes/index.js');
var vehicle = require('./routes/vehicle');
var stats = require('./routes/stats')
var http = require('http');
var path = require('path');

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

/* API */

/* Vehicle */
app.post('/api/v1/vehicles/vehicle/', vehicle.add);

app.get('/api/v1/vehicles/vehicle/', vehicle.view)

/* Stats */
app.post('/api/v1/post/stats/', stats.view);

/* Web Pages */
app.get('/vehicles/vehicle/add', site.add_vehicle);
app.get('/vehicles/vehicle/view', site.view_vehicle)
app.get('/', site.home);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
