app.directive('tagSelect', function(){
  return {
    templateUrl: "/templates/directives/tag_select.html",
    restrict: "E",
    controller: "TagSelectCtrl",
    scope: {
      selectedTags: '='
    }
  }
});