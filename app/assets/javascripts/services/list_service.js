app.factory("listService", ['Restangular', function(Restangular){

  var service = {};

  service.getLists = function(tags, filterOption){
    var params = {option: filterOption, "tags[]": tags};
    
    return Restangular.all("lists").getList(params);
  };

  service.getPopularLists = function(){
    return Restangular.all("lists").getList();
  };

  service.getRecentLists = function(){
    var params = {option: "Recent"}
    return Restangular.all("lists").getList(params);
  };

  service.createList = function(listData){
    return Restangular.all("lists").post(listData);
  };

  service.getListsByTag = function(tags){
    var params = { "tags[]": tags };
    
    return Restangular.all("lists").getList(params);
    //get list is turning the params into an object

    //could store previous tags in session
  };

  service.getList = function(id){
    return Restangular.one("lists", id).get();
  };

  return service;

}])