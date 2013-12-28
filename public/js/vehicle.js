String.prototype.capitalize = function(){
	return this[0].toUpperCase() + this.slice(1).toLowerCase();
}

var vehicles = { 
		add: function(){
			var vehicle = {
				year: $('#year').val(),
				make: $('#make').val(), 
				model: $('#model').val() ,
				dateTime: new Date()
			};

			$.post('/api/v1/vehicles/vehicle/add/', vehicle, function(res){
				window.location.href= '/';
			});
		},

		makes: function(){

			$.get('/api/v1/vehicles/makes/', function(makes){
				for(var i=0; i<makes.length;i++){
					$('#make').append('<option>' + makes[i].capitalize() + '</option>');
				}
			});

		},

		models: function(make){
			var html;

			$.get('/api/v1/vehicles/models/', {make: make}, function(models){
				for(var i=0; i<models.length; i++){
					html += '<option>' + models[i].capitalize() + '<option>';
				}

				$('#model').html(html);
			});		
		},

		years: function(make, model){
			var html ;
			$.get('/api/v1/vehicles/years/', {
				"make": make.toLowerCase(), 
				"model": model.toLowerCase()
			}, function(data){
				for(var i=0; i<data.years.length; i++){
						html += '<option>' + data.years[i] + '</option>';
				}

				$('#year').html(html);

				$("#vehicleID").attr('href', data.id);	
			});
		},

		id: function(vehicle){
			$.get('/api/v1/vehicles/vehicle/view/', {"vehicle":  vehicle}, function(vehicle){
				$("#vehicleID").attr('href', "/vehicles/vehicle/view/"+vehicle._id);
			});
		},

		vehicles: function(){
			$.get('/api/v1/vehicles/view/', function(data){
				for(var i = 0; i < data.length; i++){
					$('tbody').append(
										'<tr>' +
										'<td id="number">' + (i+1)  + '</td>' + 
										'<td id="make">' + data[i].make.capitalize() + '</td>' + 
										'<td id="model">' + data[i].model.capitalize() + '</td>' +
										'<td id="years">' + data[i].year + '</td>'+ 
										'<td>' + 
										'<button type="button" class="btn btn-default btn-xs"><a href="/vehicles/vehicle/view/' + data[i]._id + '"><span id="info" class="glyphicon glyphicon-info-sign"></span></a></button>' +
										'<button type="button" id="delete" class="btn btn-default btn-xs" href="'+ data[i]._id + '" ><span class="glyphicon glyphicon-trash"></span></button>' + 
										'</td>' + 
									 	'</tr>'
					)
				};
			});
		},

		vehicle: function(){
			var id = $('.page-header').attr('id'),
				url = '/api/v1/vehicles/vehicle/view/'+id+'/',
				mpg = 0, 
				avg = 0;

			$.get(url, function(res){
				$('.page-header').prepend('<h3>'+ 
					res[0].make.capitalize()+ ' ' +
					res[0].model.capitalize()+ ' ' + 
					'<small>'+ res[0].year + ' </small>' + 
					'<span class="label label-default" id="mpg"> MPG</span>'+
					'</h3>'
				);

				for(var i=0;i<res[0].stats.length;i++){
					mpg = mpg + parseFloat(res[0].stats[i].mpg);
				}	

				avg = mpg / res[0].stats.length;

				$("#mpg").prepend(avg);
		
				updateMPG(avg);

			});
		},

		delete: function(that){
			$(that).parent().parent().hide();

			var data = { id: $(that).attr('href') };

			$.post('/api/v1/vehicles/vehicle/delete/', data, function(res){
			});

		},
	};
	
$(document).ready(function(){
	switch( $('title').text() ){
		case 'home':
			vehicles.makes();
			break;
		case 'vehicles':
			vehicles.vehicles();
			break;
		case 'vehicle':
			vehicles.vehicle();
	}

	$(document).on('click', 'button',  function(){
			
		switch(this.id){
			case 'add':
				vehicles.add();
				break;

			case 'delete': 
				vehicles.delete(this);
				break;
		}	
	});

	$('#make').on('click', function(){		
		switch($(this).val()){
			case 'Make':
				alert("Select a make");
				break;

			default:
				vehicles.models($(this).val());
				break;

		}
	});

	$('#model').on('click', function(){
		switch($(this).val()){
			case 'Model': 
				alert("Select a model");
				break;
			default: 
				vehicles.years($('#make').val(), $('#model').val());
		}
	});

	$("#year").on("click", function(){
		switch($(this).val()){
			case "Year":
				alert("Select a year");
			default: 
				var vehicle = {
					"make": $("#make").val().toLowerCase(), 
					"model": $("#model").val().toLowerCase(), 
					"year": parseFloat($("#year").val())
				};

				vehicles.id(vehicle)
		}
	});

});