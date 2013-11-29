$(document).ready(function(){

	var dateTime = new Date();

	var vehicle = { 
		add: function(){
			var vehicle = {
				year: $('#year').val(),
				make: $('#make').val(), 
				model: $('#model').val() ,
				dateTime: dateTime
			};

			$.post('/api/v1/vehicles/vehicle/add/', vehicle, function(res){
				console.log(res);
			});
		},

		viewMulti: function(){
			$.get('/api/v1/vehicles/view/', function(data){
				for(var i = 0; i < data.length; i++){
					$('tbody').append(
										'<tr>' +
										'<td id="number">' + (i+1)  + '</td>' + 
										'<td id="year">' + data[i].year + '</td>'+ 
										'<td id="make">' + data[i].make + '</td>' + 
										'<td id="model">' + data[i].model + '</td>' +
										'<td>' + 
										'<button type="button" class="btn btn-default btn-xs"><a href="/vehicles/vehicle/view/' + data[i]._id + '"><span id="info" class="glyphicon glyphicon-info-sign"></span></a></button>' +
										'<button type="button" class="btn btn-default btn-xs"><span id="delete" href="'+ data[i]._id + '" class="glyphicon glyphicon-trash"></span></button>' + 
										'</td>' + 
									 	'</tr>'
					);
				};
			});
		},

		viewSingle: function(){
			
		},

		delete: function(that){
			$(that).parent().parent().parent().hide();

			var data = { id: $(that).attr('href') };

			$.post('/api/v1/vehicles/vehicle/delete/', data, function(res){
				console.log(res);
			});

		}
	};


	$('#add').click(function(){
		vehicle.add();
	});


	var path = window.location.pathname;
	var viewPath = '/vehicles/view/';

	if(path == viewPath){
		vehicle.viewMulti();
	}

	$(document).on('click','#delete', function(){
		vehicle.delete(this);
	});

});