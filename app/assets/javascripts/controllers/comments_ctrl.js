app.controller("CommentsCtrl", ['$scope', 'ModalService', function($scope, ModalService){
  
  $scope.parentComment = function(comment){
    return comment.comments.length > 0;
  };

  $scope.comment = function(comment){

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