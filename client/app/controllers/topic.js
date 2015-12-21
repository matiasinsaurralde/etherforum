function TopicCtrl( $rootScope, $state, $stateParams ) {
  var self = this;

  self.topic = contract.topics( $stateParams.topic_id );

};
