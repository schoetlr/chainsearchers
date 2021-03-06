var app = angular.module('app', ['ui.router', 'restangular', 'ui.bootstrap', 'Devise', 'angular-read-more']);



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

    .state("help", {
      url: "/help",
      abstract: true,
      template: '<div ui-view></div>'
    })

    .state("help.show", {
      url: "",
      templateUrl: '/templates/help/help.html'
      
    })

    .state("plugin", {
      url: "/plugin",
      abstract: true,
      template: '<div ui-view></div>'
    })

    .state("plugin.show", {
      url: "",
      templateUrl: '/templates/plugin/plugin.html'
      
    })

    .state("lists.index", {
      url: "",
      templateUrl: '/templates/lists/index.html',
      controller: "ListsCtrl"
    })

    .state("lists.show", {
      url: ":id",
      templateUrl: '/templates/lists/show.html',
      controller: "ListCtrl"
    })

    .state("users", {
      url: "/users",
      abstract: true,
      template: '<div ui-view></div>'
    })

    .state("users.show", {
      url: "/:id",
      templateUrl: '/templates/users/show.html',
      controller: "UserCtrl",
      

    });

    
    
});











app.factory("_", ['$window', function($window){
  return $window._;
}]);