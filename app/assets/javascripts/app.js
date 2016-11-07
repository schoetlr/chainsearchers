var app = angular.module('app', ['ui.router', 'restangular', 'angularModalService', 'Devise']);



app.config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

app.config([
  'RestangularProvider',
  function(RestangularProvider) {

    
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);



app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("lists", {
      url: "/",
      abstract: true,
      template: '<div ui-view></div>'
    })

    .state("lists.index", {
      url: "",
      templateUrl: '/templates/lists/index.html',
      controller: "ListsCtrl"
    })


    
})











app.factory("_", ['$window', function($window){
  return $window._;
}]);