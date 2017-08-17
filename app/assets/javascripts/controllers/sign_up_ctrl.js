app.controller("SignUpCtrl", ['$scope', 'userService', '_', function($scope, userService, _){
  
  userService.getUsers().then(function(response){
    $scope.users = response;
    $scope.usernames = _.map($scope.users, function(user){
      return user.username;
    });
    $scope.emails = _.map($scope.users, function(user){
      return user.email;
    });
  }, function(){
    console.log("could not get all users");
  });

  $scope.formData = {};
  $scope.usernameTaken = false;
  

  $scope.$watch(function($scope){
    return $scope.username;
  }, function(newValue){
    console.log("watched");
    if($scope.takenUsername()){
      $scope.usernameTaken = true;
    } else {
      $scope.usernameTaken = false;
    };
  });


  $scope.takenUsername = function(){
    var match = _.find($scope.usernames, function(username){
      return username === $scope.username;
    });

    return !!match;
  };
  
}]);