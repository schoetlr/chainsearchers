app.controller("EditListCtrl", ['$scope', 'listService', 'linkService', '$rootScope', 'Restangular', 'list', function($scope, listService, linkService, $rootScope, Restangular, list){

  $scope.list = list;
  $scope.selectedTags = $scope.list.tags;

  $scope.listLinks = function(list){
    var links = [];

    var link = list.link;

    
    while(link){
      links.push(link);
      link = link.children[0];
      
    }
    
    return links;
  };

  $scope.links = $scope.listLinks($scope.list);
  
  $scope.updateList = function(){
    //update list, it's tags and links
    $scope.list.tags = $scope.selectedTags;
    var list = Restangular.restangularizeElement(null, $scope.list, "lists");
    var listParams = {title: $scope.list.title, description: $scope.list.description}
    list.patch({ links: $scope.links, list: listParams, tags: $scope.selectedTags });
    
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

  $scope.addLink = function(){
    $scope.links.push({});

    $scope.elongateModal();

  };



}]);