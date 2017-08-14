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

  $scope.updateLinks = function(links){
    //helper method for updateList, this updates each link
    links.forEach(function(link){
      var newLinkMade = false;
      //if link has had patch() it
      if(link.id !== undefined){
        link = Restangular.restangularizeElement(null, link, "links");
        link.patch();
      } else {
        newLinkMade = true;
        var linkData = { list_id: $scope.list.id, links: [], update: true };
        linkData.links.push(link);
        linkService.createLinks(linkData);
      };

      if(newLinkMade){
        $rootScope.$broadcast("link.created");
      };
      
    });
  };
  

  $scope.updateList = function(){
    //update list
    $scope.list.tags = $scope.selectedTags;
    var list = Restangular.restangularizeElement(null, $scope.list, "lists");
    list.patch();

    //update each link
    $scope.updateLinks($scope.links);

    //update tags
    
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