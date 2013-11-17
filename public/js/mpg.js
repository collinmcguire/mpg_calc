$(document).ready(function(){

		var Vehicle = function(){
			stats = {
				s_mile : $('#start_mile').val(),
				e_mile : $('#end_mile').val(),
				s_fuel : $('#start_fuel').val(),
				e_fuel : $('#end_fuel').val(),
				make : $('#make').val(),
				model : $('#model').val(),
				year : $('#year').val(),
				mpg: ''
			};

			this.mpg = function(){
				var mpg = (stats.e_mile - stats.s_mile) / (stats.s_fuel - stats.e_fuel);
				stats.mpg = mpg; 
				
				return mpg
			};

			this.show = function(){
				$('div.alert').removeClass('hidden');
				$('span.mpg').text(this.mpg());
			}

			this.send = function(){
				$.post('/api/v1/post/stats', stats, function(res){
					console.log(res);
				});
			};
		};

		$('#calc').click(function(){
			var vehicle = new Vehicle();
			vehicle.show();
			vehicle.send();
		});

});