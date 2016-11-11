app.factory("favoriteService", ["Restangular", function(Restangular){
  var service = {};

  service.favoriteList = function(list){
    var listId = list.id;
    favData = { list_id: listId };
    var data = { favorite: favData };
    return Restangular.all("favorites").post(data);
  };


  return service;
}]);