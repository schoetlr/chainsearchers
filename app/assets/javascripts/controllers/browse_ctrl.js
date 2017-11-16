app.controller("BrowseCtrl", ['$scope', 'list', 'links', 'ModalService', 'selectedIndex', '$sce', 'voteService', 'favoriteService', 'currentUser', 'commentService', 'close', function($scope, list, links, ModalService, selectedIndex, $sce, voteService, favoriteService, currentUser, commentService, close){

  $scope.list = list;

  $scope.links = links;

  $scope.selectedIndex = selectedIndex;
  $scope.selectedLink = $scope.links[$scope.selectedIndex];

  $scope.viewDescription = true;

  $scope.currentUser = currentUser;

  $scope.commentForm = {};
  $scope.commenting = false;

  //hide sidebar initially
  $scope.showSideBar = false;

  $scope.dismissModal = function() {
    // close(result, 200); // close, but give 200ms for bootstrap to animate
    close("result", 200);
   };



  $scope.toggleSideBar = function(){
    $(".ModalBodyWrapper").toggleClass("HiddenModalSideBar");
  };
  //Show the toolbar initially
  $scope.showToolBar = true;
  //hide it after a few seconds
  setTimeout(function(){
    $scope.showToolBar = false;
    $scope.$apply();
  }, 2000);

  $scope.toggleCommenting = function(){
    if($scope.commenting){
      $scope.commenting = false;
    } else {
      $scope.commenting = true;
    }
  };

  $scope.comment = function(){
    $scope.commentForm.commentable_id = $scope.list.id;
    
    commentService.commentOnList($scope.commentForm);
    $scope.commenting = false;
    $scope.commentForm = {};
  };

  $scope.showDescription = function(){
    return $scope.viewDescription && $scope.showToolBar;
  };

  $scope.generatePath = function(){
    var url = $scope.selectedLink.url;
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
  };

  $scope.next = function(){
    if($scope.selectedIndex < ($scope.links.length - 1)){
      $scope.selectedIndex += 1;

      $scope.selectedLink = $scope.links[$scope.selectedIndex];
    }

  };

  $scope.previous = function(){
    if($scope.selectedIndex > 0){
      $scope.selectedIndex -= 1;

      $scope.selectedLink = $scope.links[$scope.selectedIndex];
    }
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

  $scope.upvote = function(){
    //if the listvotes has a votes  with current_user id and with downvote prop as true then splice in the new vote for it
    var list = $scope.list;
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

  $scope.downvote = function(){
    //if the listvotes has a votes with downvote prop as false then splice in the new vote for it
    var list = $scope.list;
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

  $scope.voteCount = function(){
    var list = $scope.list;
    var voteObject = _.countBy(list.votes, function(vote){
      return vote.downvote ? 'down' : 'up';
    });
    county = list;
    booboo = voteObject;
    if(!voteObject.up){
      voteObject.up = 0;
    };

    if(!voteObject.down){
      voteObject.down = 0;
    };

    return voteObject.up - voteObject.down;
  };

  $scope.favorited = function(){
    var list = $scope.list;
    var favorites = _.where(list.favorites, { user_id: $scope.currentUser.id });
    var favorite = favorites[0];

    return !!favorite;
  };



}]);