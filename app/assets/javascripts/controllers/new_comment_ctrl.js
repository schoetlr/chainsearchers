app.controller("NewCommentCtrl", ['$scope', 'commentService', 'comment', 'list', function($scope, commentService, comment, list){
  
  $scope.commentData = {};
  $scope.comment = comment;
  $scope.list = list;

  // CLOSE THE MODAL ON SUBMISSION
  $scope.createComment = function(){
    if($scope.comment){
      $scope.commentData.commentable_id = $scope.comment.id;
      commentService.respondToComment($scope.commentData);

      $scope.commentData = {};
    } else {
      $scope.commentData.commentable_id = $scope.list.id;
      commentService.commentOnList($scope.commentData);

      $scope.commentData = {};
    }
  };

}]);