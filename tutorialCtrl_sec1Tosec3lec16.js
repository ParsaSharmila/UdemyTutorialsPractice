angular.module("tutorialCtrlModule", [])

.controller("TutorialCtrl", ["$scope", "Calculations", function($scope, Calculations) {

$scope.tutorialObject = {};
$scope.tutorialObject.title = "Main Page";
$scope.tutorialObject.subTitle ="Sub title";

$scope.tutorialObject.bindOutput = 2;

$scope.tutorialObject.firstname = "Thomas";
$scope.tutorialObject.lastname ="Brown";

$scope.timesTwo = function(){
$scope.tutorialObject.bindOutput = Calculations.timesTwo($scope.tutorialObject.bindOutput);
}

}])

.factory("Calculations", function(){
	var calculations = {};
	calculations.timesTwo = function(a){
		return a * 2;
	};
	return calculations;
		

});



/*.directive("tbWelcomeMessage", function(){
	return {
		restrict: "AE",
		template: "<div>Howdy how are you?</div>"
	}
});*/
