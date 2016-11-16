app.factory("commentService", ['Restangular', function(Restangular){
  var service = {};

  service.commentOnList = function(formData){
    var data = { commentable_type: "List", commentable_id: formData.commentableId, content: formData.content };

    var params = { comment: data };
    return Restangular.all("comments").post(params);
  };

  service.respondToComment = function(){
    var data = { commentable_type: "Comment", commentable_id: formData.commentableId, content: formData.content };

    var params = { comment: data };
    return Restangular.all("comments").post(params);
  };

  return service;
}]);