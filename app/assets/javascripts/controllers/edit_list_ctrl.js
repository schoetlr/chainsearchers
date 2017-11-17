app.controller("EditListCtrl", ['$scope', 'listService', 'linkService', '$rootScope', 'Restangular', 'list', function($scope, listService, linkService, $rootScope, Restangular, list){

  $scope.list = list;
  $scope.selectedTags = $scope.list.tags;

  $scope.listLinks = function(list){
    var links = [];
    
    var link = list.link;
    if(link){
      while(link){
        links.push(link);
        link = link.children ? link.children[0] : false;
      
      }
    
      return links;
    };
    
    
  };

  $scope.links = $scope.listLinks($scope.list);
  
  $scope.updateList = function(){
    //should move this to list service
    //update list, it's tags and links
    $scope.list.tags = $scope.selectedTags;
    var list = Restangular.restangularizeElement(null, $scope.list, "lists");
    var listParams = {title: $scope.list.title, description: $scope.list.description}
    var params = { links: $scope.links, list: listParams, tags: $scope.selectedTags };
    params.postToWall = $scope.setPostToWall();
    list.patch(params);
    
  };

  $scope.setPostToWall = function(){
    //make the postToWall params explicitilly false if it is not checked
    if ($scope.list.postToWall === true){
      return true;
    } else {
      return false;
    }
  };

  $scope.removeLink = function(index, link){
    //delete link from db
    link = Restangular.restangularizeElement(null, link, 'links');
    link.remove();

    //remove from $scope.links
    $scope.links.splice(index, 1);
  };

  //helper function for addLink()
  $scope.elongateModal = function(){
    var $modal = $(".modal .modal-content");
    var currentHeight = $modal.height();
    var newHeight = currentHeight + 180;

    $modal.height(newHeight);
  };
 
  //Set modal height because there could be any amount of links
  $scope.setModalHeight = function(){
    //This is hacky but onload listener isn't working
    setTimeout(function(){
      var $modal = $(".modal .modal-content");
      foofoo = $modal;
      var currentHeight = $modal.height();
      var factor = $scope.links.length;
      var newHeight = currentHeight + (180 * factor);

      $modal.height(newHeight);
    }, 500);
    
  };

  $scope.setModalHeight();

  $scope.dismissModal = function() {
    // close(result, 200); // close, but give 200ms for bootstrap to animate
    $(".modal").remove();
    close("result", 200);
    $(".modal-backdrop").remove();
    
    $("body").css("overflow", "scroll");
   };

  $scope.addLink = function(){
    $scope.links.push({});

    $scope.elongateModal();

  };



}]);