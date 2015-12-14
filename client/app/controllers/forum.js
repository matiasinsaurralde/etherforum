function ForumCtrl( $rootScope, $state ) {
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

  loadForums();

  self.createForum = function( model ) {
    console.log( 'create forum!', model );
//    console.log(1,$rootScope.web3.eth.coinbase);
    // console.log(123,model.name, { from: $rootScope.web3.eth.coinbase } );
    // $rootScope.contract.createForum( model.name, { from:  } );
    contract.createForum( model.name, { from: web3.eth.coinbase } );

    var createdEvent = contract.forumCreated();
    createdEvent.watch( function( error, result ) {
      $state.go( 'forums' );
      createdEvent.stopWatching();
    });
  };

};
