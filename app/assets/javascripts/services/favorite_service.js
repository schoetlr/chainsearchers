app.factory("favoriteService", ["Restangular", function(Restangular){
  var service = {};

  service.favoriteList = function(list){
    var listId = list.id;
    var favData = { list_id: listId };
    var data = { favorite: favData };
    return Restangular.all("favorites").post(data);
  };

  service.deleteFavorite = function(id){
    return Restangular.one("favorites", id).remove();
  };


  return service;
}]);