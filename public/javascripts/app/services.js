(function () {
	var app = angular.module('services-panel', []);
	
	
	app.directive('serviceSection', function () {
		return {
			restrict:     'E',
			templateUrl:  '/templates/services.hbs',
			controller:   function () {
				this.service = services;
			},
			controllerAs: 'services'
		}
	});
	
	
	
	
	var services = [
		{
			icon:    'fa fa-4x fa-sun-o text-primary sr-icons',
			type:    "Counselling",
			summary: [{
				item: 'Are you feeling depressed, are you in a difficult situation where you need someone to talk to? Drop us a line!'
			}]
		}, {
			icon:    'fa fa-4x fa-suitcase text-primary sr-icons',
			type:    "Community Outreach",
			summary: [
				{
					item: "Check out live events happening in a community near you"
				}
				/*{
					item: 'Home Fellowship'
				}, {
					item: 'Youth Fellowship meetings'
				}, {
					item: 'Christian Library'
				}, {
					item: 'Counselling Center'
				}, {
					item: 'Beautiful Feet'
				}, {
					item: 'Rescue Program'
				}, {
					item: 'Rehabilitation and Deliverance'
				}*/
			]
		}, {
			icon:    'fa fa-4x fa-mobile-phone text-primary sr-icons',
			type:    "Digital Library",
			summary: [{
					item: 'Download Spirit-inspired books, music videos or stream live podcasts from our events as they happen'
				}]
			
		}, {
			icon:    'fa fa-4x fa-users text-primary sr-icons',
			type:    "Camp Meetings",
			summary: [
				{
					item: 'Register for one of our many camp meetings'
				}
			]
		}
	
	]
})();