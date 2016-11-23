app.directive('comments', function(){
  return {
    templateUrl: "/templates/directives/comments.html",
    restrict: "E",
    controller: "CommentsCtrl",
    scope: {
      comments: '=',
      list: '='
    }
  }
});