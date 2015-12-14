contract Forum {

  address public owner;
  string public name;

  struct Topic {
    string title;
    string content;
  }

  mapping ( uint => Topic ) public topics;
  uint public numTopics;


  function Forum( string _name ) {
    name = _name;
    owner = msg.sender;

    numTopics = 0;
  }

  function addTopic( string title, string content ) public returns ( uint topicId ) {

    // topics.push( Topic( title, content, msg.sender  ) );
    topicId = numTopics++;

    Topic topic = topics[topicId];
    topic.title = title;
    topic.content = content;

  }

  function getTopic( uint id ) public returns( string topic_title ) {
      Topic topic = topics[id];
      topic_title = topic.title;
  }

}
