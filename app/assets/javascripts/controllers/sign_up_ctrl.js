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

  $scope.usernameTaken = false;
  $scope.emailTaken = false;
  
  $scope.$watch(function($scope){
    return $scope.username;
  }, function(newValue){
    if($scope.takenUsername()){
      $scope.usernameTaken = true;
    } else {
      $scope.usernameTaken = false;
    };
  });

  $scope.$watch(function($scope){
    return $scope.email;
  }, function(newValue){
    if($scope.takenEmail()){
      $scope.emailTaken = true;
    } else {
      $scope.emailTaken = false;
    };
  });


  $scope.takenUsername = function(){
    var match = _.find($scope.usernames, function(username){
      return username === $scope.username;
    });

    return !!match;
  };

  $scope.takenEmail = function(){
    var match = _.find($scope.emails, function(email){
      return email === $scope.email;
    });

    return !!match;
  };
  
}]);