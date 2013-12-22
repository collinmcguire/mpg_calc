$(document).ready(function(){
	var canvas = $("#chart"), 
		y = canvas.position().left,
		x = canvas.position().top,
		width = canvas.width()-50,
		height = canvas.height()-25,
		data = [20,25,23,26,20,26];

	var paper = Raphael("chart", width, height);

	function Line(x,y,x2,y2,color){
		var line = paper.path("M"+x+","+y+"L"+x2+","+y2);
		if(color!=''){
			line.attr({
				"stroke": color
			});
		}
	}

	function Circle(x,y,rx,ry,color){
		var circle = paper.ellipse(x,y,rx,ry);
		paper.text(x,y-25,height-y);

		circle.attr({
			"fill": color,
			"stroke": color
		});		

		circle.hover(function(){
			circle.attr({
				"rx": '7',
				"ry":'7'
				})
			}, function(){
				circle.attr({
					"rx": '3',
					"ry": '3'
				})
			});

	}

	function drawDates(){
		var distance = width / (data.length+1);
	
		for(var i=0,count=1;i<data.length;i++){
			var x = distance * count,
				y = 0,
				line = new Line(x,y,x,height);

			count++;
		}
	}

	function drawValues(){
		var distance = height / (data.length+1);

		for(var i=0, count=data.length;i<data.length;i++){
			var x = 0,
				y = distance * count,
				line = new Line(x,y,width,y);
			line.attr({
				"stroke": "#333"
			});

			count--;
		}
	}

	function plotValues(avg){
		var distance = width / (data.length+1),
			color;

		switch(true){
			case avg<=19:
				color = '#d9534f';
				break;
			case avg<=25 && avg>=20:
				color = '#f0ad4e';
				break;
			case avg>=26:
				color = '#5cb85c';
				break;
			default:
				console.log("Try again");
		}

		for(var i=0, count=1;i<data.length;i++){
			var circle = new Circle( (distance*count),height-data[i],3,3,color);
			count++;
		}
	}

	function connectDots(){
		var distance = width / (data.length+1);

		for(var i=0,count=1;i<data.length;i++){
			var line = new Line((distance*count),height-data[i],(distance*(count+1)),height-data[i+1], '#333');
			count++;
		}

	}

	function avg(callback){
		var mpg = 0,
			id = $(".page-header").attr("id"),
			avg = null, 
			url = '/api/v1/vehicles/vehicle/view/'+id+'/';

		$.get(url, function(res){
			for(var i=0;i<res[0].stats.length;i++){
				mpg = mpg + parseFloat(res[0].stats[i].mpg);
			}	

			avg = mpg / res[0].stats.length;	
			callback(avg);
		});
	}

	function constructGraph(){
		var vert = Line(0,0,0,height,"#333");
		var hoz = Line(0,height,width,height,"#333");
	}

	constructGraph();

	avg(function(avg){
		plotValues(avg);
	});

	connectDots();
});

