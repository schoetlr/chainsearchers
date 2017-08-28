app.controller("UserCtrl", ['$scope', 'userService', '$stateParams', 'Auth', 'ModalService', 'Restangular', '$window', 'user', 'currentUser', function($scope, userService, $stateParams, Auth, ModalService, Restangular, $window, user, currentUser){
  
  $scope.user = user;
  $scope.currentUser = currentUser;

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

  $scope.deleteList = function(list, index){
    var confirmed = $window.confirm("Are you sure you want to permanently delete this list?");
    if(confirmed){
      var list = Restangular.restangularizeElement(null, list, 'lists');
      list.remove();
      
      $scope.user.lists.splice(index, 1);
    };
  };

}]);