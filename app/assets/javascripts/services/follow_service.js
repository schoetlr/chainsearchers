app.factory("followService", ['Restangular', '_', function(Restangular, _){

  var service = {};

  service.createFollowing = function(followerId, followedId){
    var followData = { follower_id: followerId, followed_id: followedId };
    
    return Restangular.all("followings").post(followData);
  };

  service.destroyFollowing = function(id){
    return Restangular.one("followings", id).remove();
  };

  return service;

}]);