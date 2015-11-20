"use strict";
if(App){
	window.App.controller('homeController', ['$scope', function($scope) {
		var self = this;

		self.submit = function(){

			return false;
		}
	}]);
}else{
	console.error('Failed to find App object.');
}
