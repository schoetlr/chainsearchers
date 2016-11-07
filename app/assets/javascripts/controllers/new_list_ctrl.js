app.controller("NewListCtrl", ['$scope', 'listService', 'Auth', function($scope, listService, Auth){

  $scope.form = {};

  $scope.creating = false;

  $scope.toggleCreating = function(){
    if($scope.creating === false){
      $scope.creating = true;
    } else {
      $scope.creating = false;
    }
  }

  $scope.revealForm = function(){
    return $scope.currentUser && !$scope.creating;
  };
  
  Auth.currentUser().then(function(response){
    $scope.currentUser = response;
  }, function(){
    console.log("No user logged in");
    $scope.currentUser = undefined;
  });

}]);