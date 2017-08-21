app.factory("linkService", ['Restangular', '_', function(Restangular, _){

  var service = {};

  service.createLinks = function(linksData){
    linksData.links = _.reject(linksData.links, function(link){
      return Object.keys(link).length === 1;
    });
    
    return Restangular.all("links").post(linksData);
  }

  return service;

}])