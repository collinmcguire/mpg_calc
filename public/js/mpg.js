$(document).ready(function(){


	$('#calc').click(function(){
		var Stats = function(){
			this.s_mile = $('#start_mile').val();
			this.e_mile = $('#end_mile').val();
			this.s_fuel = $('#start_fuel').val();
			this.e_fuel = $('#end_fuel').val();
			this.mpg = function(){
				return (this.e_mile - this.s_mile) / (this.s_fuel - this.e_fuel)
			};
		}
		var stats = new Stats();
		$('div.alert').removeClass('hidden');
		$('div.alert').addClass('show');
		$('span.mpg').text(stats.mpg());
	});
});