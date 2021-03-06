app.controller("TagSelectCtrl", ['$scope', 'tagService', function($scope, tagService){

  $scope.search = "";

  tagService.getTags().then(function(response){
    $scope.tags = response[0].tags;
  }, function(){
    console.log("couldn't load tags");
  });

  $scope.tagging = function(){
    //true if the search input is dirty and false if empty
    if($scope.search.length > 0){
      return true;
    }
  };

  $scope.invalidTag = function(){
    return $scope.search.length > 20; 
  };

  //watch tagging status, if true set listener for enter button
  $scope.$watch(function($scope){
    return $scope.tagging();
  }, function(tagging){
    if(tagging){
      $(document).keypress(function(e) {
        if(e.which == 13 && !$scope.invalidTag()) {
          var tag = { name: $scope.search };
          $scope.selectedTags.push(tag);
          $scope.search = "";
        } 
      });
    } else {
      $(document).off('keypress');
    }
  });

  

  $scope.selectTag = function(tag){
    $scope.selectedTags.push(tag);
    $scope.search = "";
  };

  $scope.removeTag = function(index){
    $scope.selectedTags.splice(index, 1);
  };

}]);