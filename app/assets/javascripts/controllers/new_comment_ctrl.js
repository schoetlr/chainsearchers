app.controller("NewCommentCtrl", ['$scope', 'commentService', 'comment', 'list', '$rootScope', function($scope, commentService, comment, list, $rootScope){
  
  $scope.commentData = {};
  $scope.comment = comment;
  $scope.list = list;

  // CLOSE THE MODAL ON SUBMISSION
  $scope.createComment = function(){
    if($scope.comment){
      $scope.commentData.commentable_id = $scope.comment.id;
      commentService.respondToComment($scope.commentData).then(function(response){
        $rootScope.$broadcast("comment.created");
      });

      $scope.commentData = {};
    } else {
      $scope.commentData.commentable_id = $scope.list.id;
      commentService.commentOnList($scope.commentData).then(function(response){
        $rootScope.$broadcast("comment.created");
      });

      $scope.commentData = {};
    }
  };

}]);