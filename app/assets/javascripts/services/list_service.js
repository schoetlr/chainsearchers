app.factory("listService", ['Restangular', function(Restangular){

  var service = {};

  service.getLists = function(tags, filterOption){
    var params = {option: filterOption, "tags[]": tags};
    
    return Restangular.all("lists").getList(params);
  };

  service.createList = function(listData){
    return Restangular.all("lists").post(listData);
  };

  service.getList = function(id){
    return Restangular.one("lists", id).get();
  };

  return service;

}])