app.factory("listService", ['Restangular', function(Restangular){

  var service = {};

  service.getPopularLists = function(){
    return Restangular.all("lists").getList();
  };

  service.createList = function(listData){
    return Restangular.all("lists").post(listData);
  };

  service.getListsByTag = function(tags){
    var params = { "tags[]": tags };
    foofoo = params;
    return Restangular.all("lists").getList(params);
    //get list is turning the params into an object

    //could store previous tags in session
  };

  service.getList = function(id){
    return Restangular.one("lists", id).get();
  };

  return service;

}])