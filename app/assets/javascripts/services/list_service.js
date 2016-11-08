app.factory("listService", ['Restangular', function(Restangular){

  var service = {};

  service.getPopularLists = function(){

  };

  service.createList = function(listData){
    return Restangular.all("lists").post(listData);
  };

  return service;

}])