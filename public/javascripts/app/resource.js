(function(){
	var app = angular.module('resource-panel',[]);
	
	app.directive('resourceSection', function () {
		return{
			restrict:'E',
			templateUrl: '/templates/resource.hbs',
			controller: function () {
				this.resource = resources;
			},
			controllerAs:'resources'
		}
	});
	
	
	var resources = [
		{
			title:'Some Title',
			description: 'Heavens of freedom will oddly gain a meaningless cow.',
			image: {
				thumb: '/images/portfolio/thumbnails/1.jpg',
				full: '/images/portfolio/fullsize/1.jpg'
			},podcast: {
				available: false,
				link:''
			}
		},{
			title:'Some Title',
			description: 'Heavens of freedom will oddly gain a meaningless cow.',
			image: {
				thumb: '/images/portfolio/thumbnails/1.jpg',
				full: '/images/portfolio/fullsize/1.jpg'
			},podcast: {
				available: false,
				link:''
			}
		},{
			title:'Some Title',
			description: 'Heavens of freedom will oddly gain a meaningless cow.',
			image: {
				thumb: '/images/portfolio/thumbnails/1.jpg',
				full: '/images/portfolio/fullsize/1.jpg'
			},podcast: {
				available: false,
				link:''
			}
		},{
			title:'Some Title',
			description: 'Heavens of freedom will oddly gain a meaningless cow.',
			image: {
				thumb: '/images/portfolio/thumbnails/1.jpg',
				full: '/images/portfolio/fullsize/1.jpg'
			},podcast: {
				available: false,
				link:''
			}
		},{
			title:'Some Title',
			description: 'Heavens of freedom will oddly gain a meaningless cow.',
			image: {
				thumb: '/images/portfolio/thumbnails/1.jpg',
				full: '/images/portfolio/fullsize/1.jpg'
			},podcast: {
				available: false,
				link:''
			}
		},{
			title:'Some Title',
			description: 'Heavens of freedom will oddly gain a meaningless cow.',
			image: {
				thumb: '/images/portfolio/thumbnails/1.jpg',
				full: '/images/portfolio/fullsize/1.jpg'
			},podcast: {
				available: false,
				link:''
			}
		},{
			title:'Some Title',
			description: 'Heavens of freedom will oddly gain a meaningless cow.',
			image: {
				thumb: '/images/portfolio/thumbnails/1.jpg',
				full: '/images/portfolio/fullsize/1.jpg'
			},podcast: {
				available: false,
				link:''
			}
		}
	]
})();