app.factory("tagService", ['Restangular', function(Restangular){
  var service = {};

  service.getTags = function(){
    return Restangular.all("tags").getList();
  };

  return service;

}])