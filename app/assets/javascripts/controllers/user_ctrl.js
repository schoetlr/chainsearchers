app.controller("UserCtrl", ['$scope', 'userService', '$stateParams', 'Auth', 'Restangular', '$window', '$uibModal', function($scope, userService, $stateParams, Auth, Restangular, $window, $uibModal){
  
  userService.getUser($stateParams.id).then(function(response){
      $scope.user = response;
      $scope.wallLinks = response.wallLinks;
    }, function error(){
      console.log("something went wrong getting user");
  });


  Auth.currentUser().then(function(response){
    $scope.currentUser = response;
  }, function(){
    $scope.currentUser = undefined;
  });

  //if link created in list update from EditListCtrl get the user again so it's links are up to date
  $scope.$on("link.created", function(){
    userService.getUser($stateParams.id).then(function(response){
      $scope.user = response;
    }, function error(){
      console.log("something went wrong getting user");
    });
  });

  $scope.editList = function(list){
    $uibModal.open({
      
      bindToController: true,
      controller: "EditListCtrl",
      templateUrl: "templates/lists/edit.html",
      windowTemplateUrl: "templates/modal/form_window.html",

      resolve: {
        currentUser: function(){
          return $scope.currentUser;
        },

        list: function(){
          return list;
        }
      }
    });
  };

  $scope.deleteList = function(list, index){
    var confirmed = $window.confirm("Are you sure you want to permanently delete this list?");
    if(confirmed){
      list = Restangular.restangularizeElement(null, list, 'lists');
      list.remove();
      
      $scope.user.lists.splice(index, 1);
    }
  };

}]);