app.controller("BrowseCtrl", ['$scope', 'list', 'links', 'selectedIndex', '$sce', function($scope, list, links, selectedIndex, $sce){

  $scope.list = list;

  $scope.links = links;

  $scope.selectedIndex = selectedIndex;
  $scope.selectedLink = $scope.links[$scope.selectedIndex];

  $scope.generatePath = function(){
    if($scope.selectedLink.url[0] === 'w'){
      var url = 'http://' + $scope.selectedLink.url;
      return $sce.trustAsResourceUrl(url);
    } else {
      return $sce.trustAsResourceUrl($scope.selectedLink.url);
    }
  };

  $scope.next = function(){
    if($scope.selectedIndex < ($scope.links.length - 1)){
      $scope.selectedIndex += 1;

      $scope.selectedLink = $scope.links[$scope.selectedIndex];
    }

  };

  $scope.previous = function(){
    if($scope.selectedIndex > 0){
      $scope.selectedIndex -= 1;

      $scope.selectedLink = $scope.links[$scope.selectedIndex];
    }
  };

}]);