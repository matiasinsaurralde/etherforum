function ForumCtrl( $rootScope, $state, $stateParams ) {
  var self = this;
  self.forums = [];

  function loadForums() {
    self.forums = [];
    var q = contract.forumCount().c[0],
        i = 0;

      self.forums = [];

    while( i < q ) {
      var _forum = contract.forums( i ),
          forum = { owner: _forum[0], name: _forum[1], totalMessages: _forum[2].c[0] };
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

  self.loadForumMessages = function( id ) {
    self.forum = contract.forums( id );
    self.messages = [];
    var totalMessages = self.forum[2].c[0],
        i = 0;

    var m = contract.readMessage();
    m.watch( function( error, result ) {
      console.log(123,error,result);
    });

    while( i < totalMessages ) {
      var message = contract.getMessage( 0, i, function() {} );
      console.log( i, message );
      i++;
    };
  };

  if( $stateParams.id ) {
    self.loadForumMessages( $stateParams.id );
  } else {
    loadForums();
  };

};
