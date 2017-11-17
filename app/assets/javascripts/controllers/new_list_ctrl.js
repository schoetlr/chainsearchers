app.controller("NewListCtrl", ['$scope', 'listService', 'linkService', '$rootScope', 'currentUser', function($scope, listService, linkService, $rootScope, currentUser){

  $scope.listData = {};
  $scope.listData.selectedTags = [];
  $scope.linkData = {};
  //need to refactor so that linkData is just an array
  $scope.linkData.links = [{}, {}, {}];
  $scope.currentUser = currentUser;

  $scope.createList = function(){
    $scope.setPostToWall();

    $scope.listData.links = $scope.linkData.links

    listService.createList($scope.listData).then(function(list){
      
      $rootScope.$broadcast("list.created");
    }, function(){
      console.log("something went wrong creating list");
    });    

    
  };

  $scope.setPostToWall = function(){
    //make the postToWall params explicitilly false if it is not checked
    if (!($scope.listData.postToWall === true)){
      $scope.listData.postToWall = false;
    }
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

  $scope.dismissModal = function() {
    // close(result, 200); // close, but give 200ms for bootstrap to animate
    close("result", 200);
    $(".modal-backdrop").remove();
    $(".modal").remove();
    $("body").css("overflow", "scroll");
   };



  
  
}]);