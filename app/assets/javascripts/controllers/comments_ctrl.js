app.controller("CommentsCtrl", ['$scope', 'ModalService', function($scope, ModalService){
  
  $scope.parentComment = function(comment){
    return comment.comments.length > 0;
  };

  $scope.$on("comment.created", function(){
    commentService.getListComments($scope.list).then(function(response){
      $scope.comments = response;
    }, function(){
      console.log("there was an error getting comments");
    });
  });

  $scope.newComment = function(comment){
    if(!comment){
      var comment = undefined;
    };

    ModalService.showModal({
      templateUrl: "/templates/comments/new.html",
      controller: "NewCommentCtrl",
      inputs: {
        comment: comment, 
        list: $scope.list
      }
    }).then(function(modal) {
    
      modal.element.modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });
  };

}]);