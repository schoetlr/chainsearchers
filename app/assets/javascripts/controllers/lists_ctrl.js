app.controller("ListsCtrl", ['$scope', 'listService', '$uibModal', 'tagService', 'voteService', '_', 'Auth', 'Restangular', 'favoriteService', '$sce', function($scope, listService, $uibModal, tagService, voteService, _, Auth, Restangular, favoriteService, $sce){

  $scope.selectedTags = [];
  $scope.filterOption = "Popular";

  Auth.currentUser().then(function(response){
    $scope.currentUser = response;
  }, function(){
    $scope.currentUser = undefined;
  });


  listService.getLists($scope.selectedTags, $scope.filterOption).then(function(response){
    $scope.lists = response;
  }, function(){
    console.log("something went wrong getting lists");
  });

  tagService.getTags().then(function(response){
    $scope.tags = response[0].tags;
    $scope.popularTags = response[0].popular;
  }, function(){
    console.log('could not get tags');
  });

  
  $scope.tagSearch = "";
  $scope.filtering = function(){
    return $scope.tagSearch.length > 0;
  };

  $scope.filterByTag = function(tag){

    $scope.selectedTags.push(tag);
    $scope.tagSearch = "";

  };

  $scope.withTags = function(list){
      //if list.tags includes every $scope.selctedTags then return true
      //every is the equivalent of rails all?
      var valid = _.every($scope.selectedTags, function(tag){
        var match = _.findWhere(list.tags, {id: tag.id});
        return !!match;
      });
      
      if(valid){
        return true;
      } 
  };

  $scope.filterAnon = false;

  $scope.toggleAnon = function(){
    $scope.filterAnon = !$scope.filterAnon;
  };

  $scope.anonFilter = function(list){
    //filter it out if it has a user
    if($scope.filterAnon){
      return !list.user;
    } else {
      return true;
    }
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
        list.votes.push(response);

      }, function(){ console.log("something went wrong voting"); });
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

      }, function(){ console.log("something went wrong voting"); });
      
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
    }

    if(!voteObject.down){
      voteObject.down = 0;
    }

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

  $scope.browseList = function(list, index){
    var links = $scope.listLinks(list);
    
    var selectedIndex = index;
    var inputs = {
        list: list,
        links: links, 
        selectedIndex: selectedIndex, 
        currentUser: $scope.currentUser
      };
    
    $uibModal.open({
      
      bindToController: true,
      controller: "BrowseCtrl",
      templateUrl: "templates/lists/browse.html",
      windowTemplateUrl: "templates/modal/window.html",

      resolve: {
        list: function(){
          return list;
          },
        links: function() {
          return links;
        },
        selectedIndex: function(){
          return index;
        },
        currentUser: function(){
          return $scope.currentUser;
        }
      }
    });
  };

  $scope.showNewList = function(){

    $uibModal.open({
      
      bindToController: true,
      controller: "NewListCtrl",
      templateUrl: "templates/lists/new.html",
      windowTemplateUrl: "templates/modal/form_window.html",

      resolve: {
        currentUser: function(){
          return $scope.currentUser;
        }
      }
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

  //center new-list-btn when window is xs
  $(window).on('resize', function() {
    if($(window).width() < 768) {
        $('.new-list-btn').addClass('center-block');
        $('.new-list-btn').removeClass('pull-right');
    } else {
        $('.new-list-btn').addClass('pull-right');
        $('.new-list-btn').removeClass('center-block');
    }
  });

  $scope.generatePath = function(url){
    if(url){
      //make youtube vids embeddable
      if(url.match(/youtube/) !== null){
          url = url.replace(/watch\?v=/, function(){ 
          return "embed/";
        });
      } 

      if(url[0] === 'w'){
        url = 'http://' + url;
        return $sce.trustAsResourceUrl(url);
      } else {
        return $sce.trustAsResourceUrl(url);
      }
    }
    
  };

  $scope.showAttachedLinks = function(btn){ 
    $(btn).parents(".item-content").toggleClass("attached-links-visible"); event.preventDefault(); 
  };

  //read more.js options
  $scope.options = {
    speed: 500,
    collapsedHeight: 20,
    moreLink: '<a href="#">Read more</a>',
    lessLink: '<a href="#">Read Less</a>'
  };

}]);