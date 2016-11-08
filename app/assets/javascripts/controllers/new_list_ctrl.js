app.controller("NewListCtrl", ['$scope', 'listService', 'Auth', 'linkService', '$rootScope', function($scope, listService, Auth, linkService, $rootScope){

  $scope.listData = {};
  $scope.linkData = {};
  $scope.linkData.links = [{}, {}, {}];

  $scope.createList = function(){
    listService.createList($scope.listData).then(function(list){
      $scope.linkData.list_id = list.id;
    }, function(){
      console.log("something went wrong creating list");
    });

    linkService.createLinks($scope.linkData).then(function(){
      $rootScope.$broadcast("list.created");
      console.log("DONE fellow");
    }, function(){
      console.log("could not create links");
    });

    $scope.listData = {};
    $scope.linkData = {};
    $scope.linkData.links = [{}, {}, {}];
    $scope.toggleCreating();
  };

  $scope.addLink = function(){
    $scope.linkData.links.push({});
  };

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