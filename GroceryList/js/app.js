var app = angular.module('groceryListApp', ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider
    .when("/",{
      templateUrl: "views/groceryList.html",
      controller: "HomeController"
    })
    .when("/addItem",{
      templateUrl: "views/addItem.html",
      controller: "GroceryListItemController"
    })
    .when("/addItem/edit/:id",{
      templateUrl: "views/addItem.html",
      controller: "GroceryListItemController"
    })
    .otherwise({
      redirectTo: "/"
    })
});

app.service("GroceryService", function($http){
  var groceryService = {};

  groceryService.groceryItems = [];

  /*$http.get("data/server_data.json")
	.success(function(data){
		groceryService.groceryItems = data;

		for(var item in groceryService.groceryItems){
			groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date);
		}
	})
	.error(function(data,status){
	
	});*/

	$http({
        method: 'GET',
        url: 'data/server_data.json'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        groceryService.groceryItems = response.data;
        for(var item in groceryService.groceryItems){
            groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date);
        }
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert("Things went wrong!!");
    });

  

  groceryService.findById = function(id){
  	  for(var item in groceryService.groceryItems){
	  	  if(groceryService.groceryItems[item].id == id)
		  return groceryService.groceryItems[item];
	  }
  };

  groceryService.getNewId = function(){
  	  if(groceryService.newId){
		groceryService.newId++;
		return groceryService.newId;
	  }else{
		var maxId = _.max(groceryService.groceryItems, function(entry){return entry.id;})
		groceryService.newId = maxId.id + 1;
		return groceryService.newId;
	  }
  };

  groceryService.markCompleted = function(entry){
  	  entry.completed = !entry.completed;
  };

  groceryService.removeItem = function(entry){
  	  var index = groceryService.groceryItems.indexOf(entry);

	  groceryService.groceryItems.splice(index, 1);
  };

  groceryService.save = function(entry){
  	  //groceryService.groceryItems.push(entry);
	  var updatedItem = groceryService.findById(entry.id);

	  if(updatedItem){
	  	  updatedItem.completed = entry.completed;
		  updatedItem.itemName = entry.itemName;
		  updatedItem.date = entry.date;

	  }else{
	   $http({
       method: 'POST',
       url: 'data/added_item.json',
       params: entry
       }).then(function successCallback(response) {
             entry.id = response.newId; 
        }, function errorCallback(response, status) {
   });

	  	  //entry.id = groceryService.getNewId; //done by client side
		  groceryService.groceryItems.push(entry);
	  }
  };

  

  return groceryService;
});

app.controller("HomeController", ["$scope", "GroceryService", function($scope, GroceryService){
  //$scope.appTitle = "Grocery List";
  $scope.groceryItems = GroceryService.groceryItems;

  $scope.removeItem = function(entry){
  	  GroceryService.removeItem(entry);
  };

  $scope.markCompleted = function(entry){
	GroceryService.markCompleted(entry);
		
  };

  $scope.$watch( function(){ return GroceryService.groceryItems; }, function(groceryItems){
  	  $scope.groceryItems = groceryItems;
  })

}]);

app.controller("GroceryListItemController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService){
  
  if(!$routeParams.id){
  	  $scope.groceryItem = {id: 0, completed: false, itemName: "", date: new Date()};
  }else{
  	  $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
  }
  //$scope.groceryItems = GroceryService.groceryItems;
  //$scope.groceryItem = { id: 7, completed: true, itemName: "", date: new Date() };

  $scope.save = function() {
  GroceryService.save($scope.groceryItem);
  $location.path("/");

  }

  console.log($scope.groceryItems);

  //$scope.rp = "Route parameter value: " + $routeParams.id;
}]);


app.directive("tbGroceryItem", function(){
	return{
		restrict: "E",
		templateUrl: "views/groceryItem.html"
	}

});
