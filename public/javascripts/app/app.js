(function () {
	var app = angular.module('wcyf', []).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	
	app.controller('ServicesController', function ()
	{
		this.service = services;
	})
	
	
	
	var services = [
		{
			icon: 'fa fa-4x fa-sun-o text-primary sr-icons',
			type: "Counselling and Deliverance",
			summary: 'Some Summary'
		},{
			icon: 'fa fa-4x fa-suitcase text-primary sr-icons',
			type: "Community Outreach & Fellowship",
			summary: 'Some Summary'
		},{
			icon: 'fa fa-4x fa-book text-primary sr-icons',
			type: "Library & Store Services",
			summary: 'Some Summary'
		},{
			icon: 'fa fa-4x fa-users text-primary sr-icons',
			type: "Camp Meetings",
			summary: 'Some Summary'
		},
		
	]
})();
