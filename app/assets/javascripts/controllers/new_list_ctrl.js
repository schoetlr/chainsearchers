app.controller("NewListCtrl", ['$scope', 'listService', 'Auth', 'linkService', '$rootScope', 'currentUser', function($scope, listService, Auth, linkService, $rootScope, currentUser){

  $scope.listData = {};
  $scope.listData.selectedTags = [];
  $scope.linkData = {};
  $scope.linkData.links = [{}, {}, {}];
  $scope.currentUser = currentUser;

  $scope.createList = function(){
    listService.createList($scope.listData).then(function(list){
      $scope.linkData.list_id = list.id;

      //create Links after we have a list_id
      linkService.createLinks($scope.linkData).then(function(){
        $rootScope.$broadcast("list.created");
        $scope.listData = {};
        $scope.linkData = {};
        $scope.linkData.links = [{}, {}, {}];
        

      }, function(){
        console.log("could not create links");
      });

    }, function(){
      console.log("something went wrong creating list");
    });

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
  
  



}]);