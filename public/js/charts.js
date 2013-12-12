$(document).ready(function(){
	var vehicle = {
		get: function(){
			$.get('/api/v1/stats')
		}
	};
});