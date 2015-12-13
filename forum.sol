contract Forum {

  address public owner;
  string public name;

  struct Topic {
    string title;
    string content;

    address author;
  }

  mapping ( uint => Topic ) topics;
  uint public numTopics;


  function Forum( string _name ) {
    name = _name;
    owner = msg.sender;

    numTopics = 0;
  }

  function addTopic( string title, string content ) public returns ( uint topicId ) {

    // topics.push( Topic( title, content, msg.sender  ) );
    topicId = numTopics++;
  }

}

