app.controller("UserCtrl", ['$scope', 'userService', '$stateParams', function($scope, userService, $stateParams){
  
  userService.getUser($stateParams.id).then(function(response){
    $scope.user = response;
  }, function error(){
    console.log("something went wrong getting user");
  });

}]);