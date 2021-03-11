pragma solidity >=0.5.16;

import "./ERC721Tradable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Hello is ERC721Tradable {

    //event UserCreation(string nickname, uint tokenId, address sender);
    //uint public currentTokenId;

    constructor(address _proxyRegistryAddress) public ERC721Tradable("Hello", "HELLO", _proxyRegistryAddress) { }

    function baseTokenURI() public pure returns (string memory) {
        return "localhost:8888/api/token/";
    }

    function contractURI() public pure returns (string memory) {
        return "localhost:8888/contract";
    }

    function mint() public {
    //function mint(string memory nickname) public {
        // currentTokenId = currentTokenId + 1;
        // emit UserCreation(nickname, currentTokenId, msg.sender);
        // _mint(msg.sender, currentTokenId);
        //currentTokenId = newId;
        mintTo(msg.sender);
    }
}
