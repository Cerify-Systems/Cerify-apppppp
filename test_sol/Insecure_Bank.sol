// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// WARNING: This contract is intentionally insecure for testing purposes
// Contains multiple security vulnerabilities

contract InsecureBank {
    mapping(address => uint256) public balances;
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    // VULNERABILITY 1: No access control - anyone can call this
    function setOwner(address newOwner) public {
        owner = newOwner; // No require statement!
    }
    
    // VULNERABILITY 2: Reentrancy attack possible
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // VULNERABILITY: State change after external call
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount; // State change after external call!
    }
    
    // VULNERABILITY 3: Integer overflow/underflow (before Solidity 0.8.0)
    function deposit() public payable {
        balances[msg.sender] += msg.value; // No SafeMath protection
    }
    
    // VULNERABILITY 4: Unchecked return value
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        // VULNERABILITY: No check if transfer succeeded
        (bool success, ) = to.call{value: amount}("");
        // Missing require(success, "Transfer failed");
    }
    
    // VULNERABILITY 5: Predictable random number
    function randomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
    }
    
    // VULNERABILITY 6: Unrestricted access to sensitive function
    function emergencyWithdraw() public {
        // VULNERABILITY: No access control
        payable(msg.sender).transfer(address(this).balance);
    }
    
    // VULNERABILITY 7: Unbounded loop
    function distributeRewards(address[] memory users) public {
        for (uint256 i = 0; i < users.length; i++) {
            balances[users[i]] += 100; // Could run out of gas
        }
    }
    
    // VULNERABILITY 8: Uninitialized storage pointer
    function unsafeStorage() public {
        uint256[] storage arr; // Uninitialized storage pointer
        arr.push(1); // This will overwrite other storage
    }
    
    // VULNERABILITY 9: Unchecked external call
    function callExternal(address target, bytes memory data) public {
        // VULNERABILITY: No access control and unchecked call
        target.call(data);
    }
    
    // VULNERABILITY 10: Timestamp dependence
    function timeBasedFunction() public view returns (bool) {
        return block.timestamp % 2 == 0; // Miner can manipulate
    }
    
    // VULNERABILITY 11: Unprotected selfdestruct
    function destroy() public {
        // VULNERABILITY: No access control
        selfdestruct(payable(msg.sender));
    }
    
    // VULNERABILITY 12: Unchecked delegatecall
    function delegateCall(address target, bytes memory data) public {
        // VULNERABILITY: No access control and unchecked delegatecall
        target.delegatecall(data);
    }
    
    receive() external payable {
        // VULNERABILITY: No access control on receive function
        balances[msg.sender] += msg.value;
    }
    
    fallback() external payable {
        // VULNERABILITY: No access control on fallback function
        balances[msg.sender] += msg.value;
    }
} 