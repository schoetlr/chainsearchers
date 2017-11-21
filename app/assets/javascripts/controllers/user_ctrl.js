app.controller("UserCtrl", ['$scope', 'userService', '$stateParams', 'Auth', 'Restangular', '$window', '$uibModal', 'followService', '_', function($scope, userService, $stateParams, Auth, Restangular, $window, $uibModal, followService, _){
  
  userService.getUser($stateParams.id).then(function(response){
      $scope.user = response;
      $scope.wallLinks = response.wallLinks;
      $scope.receivedFollowings = response.receivedFollowings;
    }, function error(){
      $scope.user = undefined;
      console.log("something went wrong getting user");
  });


  Auth.currentUser().then(function(response){
    $scope.currentUser = response;
    $scope.wallLinks = response.wallLinks;
    $scope.usersFollowedBy = response.usersFollowedBy;
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

  $scope.browseLinks = function(index){
    var list = {};
    list.title = $scope.user.username + "'s Wall";
    var links = $scope.wallLinks;
    
    $uibModal.open({
      
      bindToController: true,
      controller: "BrowseCtrl",
      templateUrl: "templates/lists/browse.html",
      windowTemplateUrl: "templates/modal/window.html",

      resolve: {
        list: function(){
          return list;
          },
        links: function() {
          return links;
        },
        selectedIndex: function(){
          return index;
        },
        currentUser: function(){
          return $scope.currentUser;
        }
      }
    });
  };

  $scope.followUser = function(){
    followService.createFollowing($scope.currentUser.id, $scope.user.id);
  };

  $scope.unfollowUser = function(){
    var following = _.find($scope.receivedFollowings, function(following){
      return following.follower_id === $scope.currentUser.id;
    }); 
    followService.destroyFollowing(following.id);
  };

  $scope.followed = function(){
    var following = _.find($scope.receivedFollowings, function(following){
      return following.follower_id === $scope.currentUser.id;
    }); 

    return !!following;
  };

}]);