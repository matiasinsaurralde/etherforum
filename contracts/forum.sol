contract ForumContract {
    
    mapping ( uint => Forum ) public forums;
    // mapping( uint => Message ) public messages;
    
    uint public forumCount;
    
    struct Forum {
        address owner;
        string name;
        mapping( uint => Message ) messages;
        uint messageCount;
    }
    
    struct Message {
        string title;
        string content;
    }
    
    event readMessage(string title, string content);
    event forumCreated(string name, uint forumID);
    
    function createForum( string name ) returns( uint forumID ) {
        forumID = forumCount++;
        Forum f = forums[ forumID ];
        f.name = name;
        f.owner = msg.sender;
        
        forumCreated( name, forumID );
    }
    function createMessage( string title, string content, uint forum ) returns( uint messageID ) {
 
        Forum f = forums[ forum ];
        messageID = f.messageCount++;
        Message m = f.messages[ messageID ];
        
        m.title = title;
        m.content = content;
    }
    
    function getMessage( uint forum, uint message ) {
        Forum f = forums[ forum ];
        Message m = f.messages[ message ];
        
        readMessage( m.title, m.content );
    }

}
