(function () {
	var app = angular.module('resource-panel', []);
	
	app.directive('resourceSection', ['$http', function ($http) {
		return {
			restrict:     'E',
			templateUrl:  '/templates/resource.hbs',
			controller:   function () {
				this.resource = [];
				var item = this;
				
				$http.get('/getRes').success(function (data) {
					item.resource = data;
				});
			},
			controllerAs: 'resources'
		}
	}]);
})();
