app.controller("ListCtrl", ['$scope', 'voteService', 'favoriteService', 'listService', '$stateParams', 'Auth', 'Restangular', 'ModalService', 'commentService', '$rootScope', '$sce', function($scope, voteService, favoriteService, listService, $stateParams, Auth, Restangular, ModalService, commentService, $rootScope, $sce){

  Auth.currentUser().then(function(response){
    $scope.currentUser = response;
  }, function(){
    $scope.currentUser = undefined;
  });
  
  // PUT THIS IN A RESOLVE?
  listService.getList($stateParams.id).then(function(list){
    $scope.list = list;
    $scope.comments = $scope.list.comments;
  }, function(){
    console.log("could not get list");
  });


  $scope.listLinks = function(list){
    var links = [];

    var link = list ? list.link : false;

    
    while(link){
      links.push(link);
      link = link.children ? link.children[0] : false;
    }
    
    return links;
  };

  $scope.upvote = function(list){
    //if the listvotes has a votes  with current_user id and with downvote prop as true then splice in the new vote for it
    
    //patch it on backend
    var matches = _.where(list.votes, { user_id: $scope.currentUser.id });

    if(matches.length > 0) {
      var match = matches[0];

      if(match.downvote){
        match.downvote = false;
        voteService.updateVote(match);
      } else {
        //do nothing since it is an upvote
      }
      
    } else {
      //otherwise create new vote
      voteService.upvoteList(list).then(function(response){
        list.votes.push(response)

      }, function(){ console.log("something went wrong voting") });
    }

    

    

  };

  $scope.downvote = function(list){
    //if the listvotes has a votes with downvote prop as false then splice in the new vote for it

    //patch the vote on the back end
    var matches = _.where(list.votes, { user_id: $scope.currentUser.id });

    if(matches.length > 0) {
      var match = matches[0];

      if(!match.downvote){
        match.downvote = true;
        voteService.updateVote(match);
      } else {
        //do nothing since it is an downvote
      }
      
    } else {
      //otherwise create a new vote
      voteService.downvoteList(list).then(function(response){
        list.votes.push(response);

      }, function(){ console.log("something went wrong voting") });
      
    }

  };

  $scope.voteCount = function(list){
    if(list){
      var voteObject = _.countBy(list.votes, function(vote){
        return vote.downvote ? 'down' : 'up';
      });

      if(!voteObject.up){
        voteObject.up = 0;
      };

      if(!voteObject.down){
        voteObject.down = 0;
      };

      return voteObject.up - voteObject.down;
    };
    
  };

  $scope.handleFavorite = function(){
    //if a favorite in list.favorites w the currentUser id exists then remove it AND delete in DB
    var list = $scope.list;
    var favorites = _.where(list.favorites, { user_id: $scope.currentUser.id });
    var favorite = favorites[0];
    if(favorite){
      var index = _.indexOf(list.favorites, favorite);
      favorite = list.favorites.splice(index, 1)[0];
      favorite = Restangular.restangularizeElement(null, favorite, 'favorites');
      favorite.remove();
    } else {
      //else make a new one
      favoriteService.favoriteList(list).then(function(response){
        list.favorites.push(response);
      }, function(){
        console.log("something went wrong favoriting");
      });
    }

    
  };

  $scope.favorited = function(){
    var list = $scope.list;
    //using the if(list) so the favorited code doesn't run unless the list is loaded
    if(list){
      var favorites = _.where(list.favorites, { user_id: $scope.currentUser.id });
      var favorite = favorites[0];

      return !!favorite;
    };
  };

  $scope.browseList = function(list){
    var list = $scope.list;
    var links = $scope.listLinks(list);
    
    var selectedIndex = 0;

    ModalService.showModal({
      templateUrl: "/templates/lists/browse.html",
      controller: "BrowseCtrl",
      inputs: {
        list: list,
        links: links, 
        selectedIndex: selectedIndex, 
        currentUser: $scope.currentUser
      }
    }).then(function(modal) {
    
      modal.element.modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });
  };

  $scope.commentForm = {};

  $scope.comment = function(){
    $scope.commentForm.commentable_id = $scope.list.id;
    
    commentService.commentOnList($scope.commentForm);

    $rootScope.$broadcast("comment.created");
    $scope.commentForm = {};
  };

  $scope.$on("comment.created", function(){
    commentService.getListComments($scope.list).then(function(response){
      $scope.comments = response;
    }, function(){
      console.log("there was an error getting comments");
    });
  });

  $scope.generatePath = function(url){
    if(url){
      //make youtube vids embeddable
      if(url.match(/youtube/) !== null){
        var url = url.replace(/watch\?v=/, function(){ 
          return "embed/";
        });
      }; 

      if(url[0] === 'w'){
        var url = 'http://' + url;
        return $sce.trustAsResourceUrl(url);
      } else {
        return $sce.trustAsResourceUrl(url);
      }
    }
    
  };

}]);