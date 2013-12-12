String.prototype.capitalize = function(){
	return this[0].toUpperCase() + this.slice(1).toLowerCase();
}

$(document).ready(function(){

	var vehicles = { 
		add: function(){
			var vehicle = {
				year: $('#year').val(),
				make: $('#make').val(), 
				model: $('#model').val() ,
				dateTime: new Date()
			};

			$.post('/api/v1/vehicles/vehicle/add/', vehicle, function(res){
				console.log(res);
				window.location.href= '/';
			});
		},

		makes: function(){

			$.get('/api/v1/vehicles/makes/', function(res){
				for(var i=0; i<res.length;i++){
					$('#make').append('<option>' + res[i].make.capitalize() + '</option>');
				}
			});

		},

		models: function(make){
			var html;

			$.get('/api/v1/vehicles/models/', {tags: make}, function(res){
				for(var i=0; i<res.length; i++){
					html += '<option>' + res[i].model.capitalize() + '<option>';
				}

				$('#model').html(html);
			});		
		},

		years: function(make, model){
			var html ;
			$.get('/api/v1/vehicles/years/', {tags: [make.toLowerCase(), model.toLowerCase()] }, function(res){
				for(var i=0; i<res[0].years.length; i++){
						html += '<option>' + res[0].years[i] + '</option>';
				}
				$('#year').html(html);
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
										'<td id="years">' + data[i].years + '</td>'+ 
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
				url = '/api/v1/vehicles/vehicle/view/'+id+'/';

			$.get(url, function(res){
				$('.page-header').prepend('<h3>'+res[0].make.capitalize()+' '+res[0].model.capitalize()+'</h3>');
				
				for(var i=0;i<res[0].years.length;i++){
					$('#chart').append(
						'<div class="panel panel-default">'+ 
							'<div class="panel-heading">'+
								'<h4 class="pull-left">'+res[0].years[i]+ '- ' + '</h4>' + 
								'<h4>'+
								'<span class="label label-default pull-left">'+'0'+'</span> MPG' +
								'</h4>'+
							'</div>'+ 
							'<div class="panel-body">'+ 
							'</div>'+
						'</div>'
					);
				}
			})
		},

		delete: function(that){
			$(that).parent().parent().hide();

			var data = { id: $(that).attr('href') };

			$.post('/api/v1/vehicles/vehicle/delete/', data, function(res){
				console.log(res);
			});

		}
	};

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
				break;

			default:
				vehicles.models($(this).val());
				break;

		}
	});

	$('#model').on('click', function(){
		switch($(this).val()){
			case 'Model': 
				console.log('Select a model');
			default: 
				console.log('Finding ' + $(this).val() + 'model years');
				vehicles.years($('#make').val(), $('#model').val());
		}
	});

});