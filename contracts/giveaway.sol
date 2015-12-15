contract GiveawayContract {

    mapping ( uint => address ) public addresses;
    uint public addressCount;

    function registerAddress() returns ( uint addressID ) {
      addressID = addressCount++;
      addresses[ addressID ] = msg.sender;
    }

}
