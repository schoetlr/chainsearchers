app.factory("listService", ['Restangular', function(Restangular){

  var service = {};

  service.getPopularLists = function(){
    return Restangular.all("lists").getList();
  };

  service.createList = function(listData){
    return Restangular.all("lists").post(listData);
  };

  return service;

}])