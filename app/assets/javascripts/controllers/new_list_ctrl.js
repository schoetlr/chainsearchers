app.controller("NewListCtrl", ['$scope', 'listService', 'linkService', '$rootScope', 'currentUser', function($scope, listService, linkService, $rootScope, currentUser){

  $scope.listData = {};
  $scope.listData.selectedTags = [];
  $scope.linkData = {};
  //need to refactor so that linkData is just an array
  $scope.linkData.links = [{}, {}, {}];
  $scope.currentUser = currentUser;

  $scope.createList = function(){
    $scope.listData.links = $scope.linkData.links

    listService.createList($scope.listData).then(function(list){
      
      $rootScope.$broadcast("list.created");
    }, function(){
      console.log("something went wrong creating list");
    });    

    
  };

  //helper function for addLink()
  $scope.elongateModal = function(){
    var $modal = $(".modal .modal-content");
    var currentHeight = $modal.height();
    var newHeight = currentHeight + 180;

    $modal.height(newHeight);
  };

  $scope.addLink = function(){
    $scope.linkData.links.push({});

    $scope.elongateModal();

  };



  
  
}]);