app.controller("ListsCtrl", ['$scope', 'listService', 'ModalService', 'tagService', 'voteService', '_', 'Auth', 'Restangular', 'favoriteService', function($scope, listService, ModalService, tagService, voteService, _, Auth, Restangular, favoriteService){

  $scope.selectedTags = [];
  $scope.filterOption = "Popular";

  Auth.currentUser().then(function(response){
    $scope.currentUser = response;
  }, function(){
    console.log("No user logged in");
    $scope.currentUser = undefined;
  });


  listService.getLists($scope.selectedTags, $scope.filterOption).then(function(response){
    $scope.lists = response;
  }, function(){
    console.log("something went wrong getting lists");
  });

  tagService.getTags().then(function(tags){
    $scope.tags = tags;
  }, function(){
    console.log('could not get tags');
  })

  
  $scope.tagSearch = "";
  $scope.filtering = function(){
    return $scope.tagSearch.length > 0;
  };

  $scope.filterByTag = function(tag){

    $scope.selectedTags.push(tag);
    $scope.tagSearch = "";

    listService.getLists($scope.selectedTags, $scope.filterOption).then(function(lists){
      $scope.lists = lists;
    }, function(){
      console.log("something went wrong filtering lists by tag");
    })
  };

  $scope.removeTag = function(index){
    $scope.selectedTags.splice(index, 1);

    listService.getLists($scope.selectedTags, $scope.filterOption).then(function(response){
        $scope.lists = response;
      }, function(){
        console.log("something went wrong getting lists");
      }
    );
  };

  

  $scope.filterByOption = function(){
    listService.getLists($scope.selectedTags, $scope.filterOption).then(function(response){
      $scope.lists = response;
    }, function(){
      console.log("something went wrong getting lists");
    });
    
  };
  
  $scope.listLinks = function(list){
    var links = [];

    var link = list.link;

    
    while(link){
      links.push(link);
      link = link.children[0];
      
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
        //do nothing since it is an upvote
      }
      
    } else {
      //otherwise create a new vote
      voteService.downvoteList(list).then(function(response){
        list.votes.push(response);

      }, function(){ console.log("something went wrong voting") });
      
    }

  };

  $scope.voteCount = function(list){
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

  $scope.handleFavorite = function(list){
    //if a favorite in list.favorites w the currentUser id exists then remove it AND delete in DB
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

  $scope.favorited = function(list){
    var favorites = _.where(list.favorites, { user_id: $scope.currentUser.id });
    var favorite = favorites[0];

    return !!favorite;
  };

  $scope.browseList = function(list){
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

  $scope.showNewList = function(){

    ModalService.showModal({
      templateUrl: "/templates/lists/new.html",
      controller: "NewListCtrl",
      inputs: {
        currentUser: $scope.currentUser
      }
    }).then(function(modal) {
    
      modal.element.modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });
  };

  $scope.showList = function(list){
    $state.go("lists.show", { id: list.id });
  };
  
  //Change this to get the proper popular or recent lists
  $scope.$on("list.created", function(){
    listService.getLists($scope.selectedTags, $scope.filterOption).then(function(response){
      $scope.lists = response;
    }, function(){
      console.log("something went wrong getting lists");
    });
  });

}]);