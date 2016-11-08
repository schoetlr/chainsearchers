app.controller("ListsCtrl", ['$scope', 'listService', 'ModalService', function($scope, listService, ModalService){

  

  listService.getPopularLists().then(function(response){
    $scope.lists = response;
  }, function(){
    console.log("something went wrong getting lists");
  });
  
  $scope.listLinks = function(list){
    var links = [list.link];

    var link = list.link;

    while(link){
      link = link.children[0];
      links.push(link);
    }

    return links;
  };

  $scope.browseList = function(list){
    var links = $scope.listLinks(list);
    
    var selectedIndex = 0;

    ModalService.showModal({
      templateUrl: "/templates/lists/browse.html",
      controller: "BrowseCtrl",
      inputs: {
        list: list,
        links: links, 
        selectedIndex: selectedIndex
      }
    }).then(function(modal) {
    
      modal.element.modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });
  };

}]);