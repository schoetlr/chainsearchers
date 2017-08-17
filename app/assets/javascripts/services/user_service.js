app.factory("userService", ['Restangular', function(Restangular){

  var service = {};

  service.getUser = function(id){
    return Restangular.one("users", id).get();
  };

  service.getUsers = function(){
    return Restangular.all("users").getList();
  };

  return service;

}])