app.controller("TagSelectCtrl", ['$scope', 'tagService', function($scope, tagService){

  tagService.getTags().then(function(response){
    $scope.tags = response;
  }, function(){
    console.log("couldn't load tags");
  });

}]);