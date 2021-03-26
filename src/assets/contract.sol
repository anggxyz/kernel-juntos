pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract KERNELGift is ERC721, Ownable {
    constructor() ERC721("KERNEL Gift", "KGFT") { }
    
    bytes32 root;
    string tokenUri;
    
    function set (bytes32 newRoot) public onlyOwner {
        root = newRoot;
    }
    
    function get () public view returns (bytes32) {
        return root;
    }
    
    function setTokenUri(string memory newURI) public onlyOwner {
        tokenUri = newURI;
    }
    
    function getTokenUri () public view returns (string memory) {
        return tokenUri;
    }
    
    function verify(
        bytes32 leaf,
        bytes32[] calldata proof
      )
        public
        view
        returns (bool)
      {
        bytes32 computedHash = leaf;
    
        for (uint256 i = 0; i < proof.length; i++) {
          bytes32 proofElement = proof[i];
    
          if (computedHash < proofElement) {
            // Hash(current computed hash + current element of the proof)
            computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
          } else {
            // Hash(current element of the proof + current computed hash)
            computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
          }
        }
        // Check if the computed hash (root) is equal to the provided root
        return computedHash == root;
      }
    
    function _baseURI() internal view virtual override returns (string memory) {
        // return "https://gift.kernel.community/raw/";
        return tokenUri;
    }

    function mintGift(address receiver, uint256 tokenId, bytes32 leaf, bytes32[] calldata proof)
        public
        returns (uint256)
    {
        require(verify(leaf, proof), "ERROR: not a member");
        _mint(receiver, tokenId);
        return tokenId;
    }
}
