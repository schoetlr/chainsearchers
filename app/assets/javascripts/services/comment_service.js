app.factory("commentService", ['Restangular', function(Restangular){
  var service = {};

  service.commentOnList = function(formData){
    var data = { commentable_type: "List", commentable_id: formData.commentable_id, content: formData.content };

    var params = { comment: data };
    return Restangular.all("comments").post(params);
  };

  service.respondToComment = function(formData){
    var data = { commentable_type: "Comment", commentable_id: formData.commentable_id, content: formData.content };

    var params = { comment: data };
    return Restangular.all("comments").post(params);
  };

  service.getListComments = function(list){
    var data = { list_id: list.id };

    return Restangular.all("comments").getList(data);
  };

  return service;
}]);