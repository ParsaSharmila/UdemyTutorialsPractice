var app = angular.module('tutorialApp', ["ngRoute","tutorialCtrlModule"]);

app.config(function($routeProvider){
	$routeProvider

		.when("/", {
			templateUrl: "views/tutorial.html",
			controller: "TutorialCtrl"
		})
		.when("/tutorialSecond", {
			templateUrl: "views/tutorialSecond.html",
			controller: "TutorialCtrl2"
		})
		.otherwise({
			redirectTo: "/"
		})


})
