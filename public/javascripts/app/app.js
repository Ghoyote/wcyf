(function () {
	var app = angular.module('wcyf', ['services-panel']).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	
	/*app.controller('ServicesController', function ()
	{
		this.service = services;
	});*/
	
	
	
	
})();
