var test;

updateMPG = function(mpg){
	switch(true){
		case mpg<=19:
			$("#mpg").removeClass();
			$("#mpg").addClass("label label-danger");
			$("#mpg").html(parseInt(mpg) + ' MPG');
			$("#alert").removeClass("hidden");
			break;
		case mpg<=25 && mpg>=20:
			$("#mpg").removeClass();
			$("#mpg").addClass("label label-warning");
			$("#mpg").html(parseInt(mpg) + ' MPG');
			$("#alert").removeClass("hidden");
			break;
		case mpg>=26:
			$("#mpg").removeClass();
			$("#mpg").addClass("label label-success");
			$("#mpg").html(parseInt(mpg) + ' MPG');
			$("#alert").removeClass("hidden");
			break;
		default:
			alert("Try again");
	}
};

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
			updateMPG(res);
			test = res;
		});
	}
};

$(document).ready(function(){
	$(document).on("click", "button", function(){
		switch(this.id){
			case 'calc':
				stats.add();
				break;
		}
	});
});