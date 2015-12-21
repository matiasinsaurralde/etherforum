function ForumCtrl( $rootScope, $state, $stateParams ) {
  var self = this;
  self.forums = [];

  function loadForums() {
    self.forums = [];
    var q = contract.ForumCount().c[0],
        i = 0;
	
      self.forums = [];

    while( i < q ) {
      var _forum = contract.forums( i ),
          forum = { owner: _forum[0], name: _forum[1], totalTopics: _forum[2].c[0] };
      self.forums.push( forum );
      i++;
    };
  };

  self.createForum = function( model ) {
    contract.createForum.sendTransaction( model.name, { from: web3.eth.defaultAccount, value: 1000, gas: 1000000 }, function(a,b,c ) {
      console.log(a,b,c);
    });

    var createdEvent = contract.forumCreated();
    createdEvent.watch( function( error, result ) {
      $state.go( 'forums' );
      createdEvent.stopWatching();
    });
  };

  self.loadTopics = function( id ) {
    self.forum = contract.forums( id );
    self.forum.id = id;
    self.topics = {};

    var topicCount = self.forum[2].c[0],
        i = 0;

    while( i < topicCount ) {
      var topic_id = contract.forums_topics( id, i );
      var topic = contract.topics( topic_id )
      // self.topics.push( topic );
      self.topics[ topic_id ] = topic;
      i++;
    };

  };

  if( $stateParams.id ) {
    self.loadTopics( $stateParams.id );
  } else {
    loadForums();
  };

};
