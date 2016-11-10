app.controller("ListsCtrl", ['$scope', 'listService', 'ModalService', 'tagService', function($scope, listService, ModalService, tagService){

  

  listService.getPopularLists().then(function(response){
    $scope.lists = response;
  }, function(){
    console.log("something went wrong getting lists");
  });

  tagService.getTags().then(function(tags){
    $scope.tags = tags;
  }, function(){
    console.log('could not get tags');
  })

  $scope.selectedTags = [];
  $scope.tagSearch = "";
  $scope.filtering = function(){
    return $scope.tagSearch.length > 0;
  };

  $scope.filterByTag = function(tag){
    
    $scope.selectedTags.push(tag);
    $scope.tagSearch = "";

    listService.getListsByTag($scope.selectedTags).then(function(lists){
      $scope.lists = lists;
    }, function(){
      console.log("something went wrong filtering lists by tag");
    })
  }
  
  $scope.listLinks = function(list){
    var links = [];

    var link = list.link;

    
    while(link){
      links.push(link);
      link = link.children[0];
      
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