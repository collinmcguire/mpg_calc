String.prototype.capitalize = function(){
	return this[0].toUpperCase() + this.slice(1).toLowerCase();
}

$(document).ready(function(){
	var stats = {
		statLine: {
			s_mile: '',
			e_mile: '',
			s_fuel: '',
			e_fuel: '',
			mpg : '',
			vehicle: { 
				make: '',
				model: '',
				year: '',
			}
		},

		set: function(statLine){
			statLine.s_mile= $('#start_mile').val();
			statLine.e_mile= $('#end_mile').val();
			statLine.s_fuel= $('#start_fuel').val();
			statLine.e_fuel= $('#end_fuel').val();
			statLine.mpg= (this.statLine.e_mile - this.statLine.s_mile) / (this.statLine.s_fuel - this.statLine.e_fuel);
			statLine.vehicle.make= $('#make').val();
			statLine.vehicle.model= $('#model').val();
			statLine.vehicle.year= $('#year').val();
			statLine.date = new Date();
		}, 

		show: function(mpg){
			$('.mpg').text(mpg);
			$('.alert').removeClass('hidden');
		},

		send: function(statLine){
			$.post('/api/v1/stats/add/', statLine, function(res){
				console.log(res);
			});

			console.log('Stats sent');
		},

		viewMulti: function(){
			$.get('/api/v1/stats/view/', function(data){
				for(var i = 0; i<data.length; i++){
					$('tbody').append(
										'<tr>'+
										'<td id="number">' + (i+1)  + '</td>' + 
										'<td id="year">' + data[i].vehicle.year + '</td>'+ 
										'<td id="make">' + data[i].vehicle.make + '</td>' + 
										'<td id="model">' + data[i].vehicle.	model + '</td>' +
										'<td id="mpg">' + data[i].mpg + '</td>' + 
										'<td>' + 
										'<button type="button" class="btn btn-default btn-xs"><a href="/vehicles/vehicle/view/' + data[i]._id + '"><span id="info" class="glyphicon glyphicon-info-sign"></span></a></button>' +
										'<button type="button" id="delete"class="btn btn-default btn-xs" href="'+ data[i]._id + '"><span class="glyphicon glyphicon-trash"></span></button>' + 
										'</td>' + 
									 	'</tr>'
					);
				};
				console.log(data);
			});
		},

		viewSingle: function(){

		},

		delete: function(that){
			$(that).parent().parent().hide();

			var data = { id: $(that).attr('href') };

			$.post('/api/v1/stats/delete/', data, function(res){
				console.log(res);
			});
		}
	};

	switch(window.location.pathname){

		case '/stats/view/':
			stats.viewMulti();	
			break;	
			
	}

	$(document).on('click', 'button',  function(){
			
		switch(this.id){
			case 'calc':
				stats.set(stats.statLine);
				stats.show(stats.statLine.mpg);
				stats.send(stats.statLine);
				break;

			case 'delete': 
				stats.delete(this);
				break;
		}	
	});

});