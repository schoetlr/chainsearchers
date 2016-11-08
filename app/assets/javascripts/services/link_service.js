app.factory("linkService", ['Restangular', function(Restangular){

  var service = {};

  service.createLinks = function(linksData){
    return Restangular.all("links").post(linksData);
  }

  return service;

}])