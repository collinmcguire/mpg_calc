$(document).ready(function(){
	
	var Vehicle = function(){
		add: {
			var vehicle = {
				year: $('#year').val(),
				make: $('#make').val(), 
				model: $('#model').val() 
			};

			$.post('/api/v1/vehicles/vehicle/', vehicle, function(res){
				console.log(res);
			});
		};
	};

	$('#add').click(function(){
		var vehicle = new Vehicle();
		vehicle.add;
	});


});