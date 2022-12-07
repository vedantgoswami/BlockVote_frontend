pragma solidity >=0.5.0;

contract Election{
    // model a condidate 
    struct Candidate{
      uint id;
      string name;
      uint age;
      string party;
      string qualification;
      uint voteCount;
      string ipfsHash;
    }
    struct Voter{
      address uid;
      string aadhar;
      string password;
      bool verified;
    }
    //Registered voters
    mapping(address => Voter) public register;
    mapping(uint => Voter) public registertemp;
    mapping(address => uint) public a2id;
    // store accounts that have voted
    mapping(address => bool) public voters;
   // store a candiate 
   // fetch candidate 
    mapping(uint => Candidate) public candidates;
    // store candidate count
    uint public candidatesCount=0;
    uint public votersCount=0;
    uint public votedCount=0;
    // Election State
    uint public electionState=1;
    // Admin login
    string private username = "vedantg68";
    string private password = "india";
    bool public admin = false;
    address public currVoter;
    // constructor() public{
    //   addCandidate("candidate 1",34,"AAP","Phd");
    // }
    function reset() public
    {
     
          candidatesCount=0;
          votersCount=0;
          votedCount=0;
          electionState=1;
          admin=false;
     
    }
    function SetVoter(address _address) public
    {
        currVoter = _address;
    }
    function verify(address _address) public
    {
      register[_address].verified = true;
      registertemp[a2id[_address]].verified = true;
    }
    function verifyall() public{
      for(uint i=1;i<=votersCount;i++){
        registertemp[i].verified = true;
        register[registertemp[i].uid].verified = true;
      }
    }
    function getUsername() public returns(string memory status)
    {
      return username;
    }
    function getPassword() public returns(string memory status)
    {
      return password;
    }
    function setAdmin(bool _admin) public{
      admin = _admin;
    }
    function addCandidate (string memory _name,uint _age,string memory _party,string memory _qualification,string memory _image) public returns(string memory status) {
      require(electionState==1);
      candidatesCount++;
      candidates[candidatesCount] = Candidate(candidatesCount,_name,_age,_party,_qualification,0,_image);
      return "sucess";
    }
    function registration (address _address,string memory _aadhar,string memory _password) public 
    {
      votersCount++;
      a2id[_address] = votersCount;
      registertemp[votersCount] = Voter(_address,_aadhar,_password,false);
      register[_address] = Voter(_address,_aadhar,_password,false);
      
    }
    function changeState(uint _state) public {
      require(_state>electionState);
      electionState = _state;
    }
    function vote(uint _candidateId,address _voter) public {
      // address has not voted before
      require(!voters[_voter]);
      votedCount++;
      // update the voter has voted
      voters[_voter] = true;
      //update the votes of candidate
      candidates[_candidateId].voteCount ++;
    }

}