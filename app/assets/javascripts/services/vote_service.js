app.factory("voteService", ["Restangular", function(Restangular){
  var service = {};

  service.upvoteList = function(list){
    listData = { list_id: list.id };
    var data = { vote: listData };
    return Restangular.all("votes").post(data);
  };

  service.downvoteList = function(list){
    var data = { list_id: list.id, downvote: true };
    var params = { vote: data };

    return Restangular.all("votes").post(params);

  };

  service.updateVote = function(vote){
    vote = Restangular.restangularizeElement(null, vote, '/votes');
    vote.patch();
  };

  return service;
}]);