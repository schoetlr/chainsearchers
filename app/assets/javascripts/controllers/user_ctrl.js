app.controller("UserCtrl", ['$scope', 'userService', '$stateParams', 'Auth', 'ModalService', function($scope, userService, $stateParams, Auth, ModalService){
  
  userService.getUser($stateParams.id).then(function(response){
    $scope.user = response;
  }, function error(){
    console.log("something went wrong getting user");
  });

  Auth.currentUser().then(function(response){
    $scope.currentUser = response;
  }, function(){
    console.log("No user logged in");
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
    ModalService.showModal({
      templateUrl: "/templates/lists/edit.html",
      controller: "EditListCtrl",
      inputs: {
        currentUser: $scope.currentUser,
        list: list
      }
    }).then(function(modal) {
    
      modal.element.modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });
  };

}]);