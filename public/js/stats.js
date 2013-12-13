updateMPG = function(mpg){
	switch(true){
		case mpg<=19:
			console.log("MPG is bad");
			$("#mpg").removeClass();
			$("#mpg").addClass("label label-danger");
			$("#mpg").html(mpg);
			$("#alert").removeClass("hidden");
			break;
		case mpg<=25 && mpg>=20:
			console.log("MPG is good");
			$("#mpg").removeClass();
			$("#mpg").addClass("label label-warning");
			$("#mpg").html(mpg);
			$("#alert").removeClass("hidden");
			break;
		case mpg>=26:
			console.log("MPG is outstanding");
			$("#mpg").removeClass();
			$("#mpg").addClass("label label-success");
			$("#mpg").html(mpg);
			$("#alert").removeClass("hidden");
			break;
		default:
			console.log("MPG is not correct, try again");
	}
};

$(document).ready(function(){

	var stats = {
		add: function(){
			var vehicle = {
				"make": $("#make").val(),
				"model": $("#model").val(),
				"year": $("#year").val(),
				"stats": {
					"startMile": $("#start_mile").val(),
					"endMile": $("#end_mile").val(),
					"startFuel": $("#start_fuel").val(),
					"endFuel": $("#end_fuel").val()
				}
			};

			$.post('/api/v1/stats/add/', vehicle, function(res){
				console.log(res);
				updateMPG(res);
			});
		},
	};

	$(document).on("click", "button", function(){
		switch(this.id){
			case 'calc':
				stats.add();
				break;
			default: 
				console.log("User clicked " + this.id + " button");
		}
	});
});