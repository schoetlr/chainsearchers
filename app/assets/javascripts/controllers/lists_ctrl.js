app.controller("ListsCtrl", ['$scope', 'listService', function($scope, listService){

  listService.getPopularLists().then(function(response){
    $scope.lists = response;
  }, function(){
    console.log("something went wrong getting lists");
  });
  

}]);