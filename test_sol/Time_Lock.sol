// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TimeLock is Ownable {
    struct Transaction {
        address target;
        uint256 value;
        bytes data;
        uint256 timestamp;
        bool executed;
        bool canceled;
    }
    
    uint256 public minDelay = 24 hours;
    uint256 public maxDelay = 30 days;
    uint256 public transactionCount;
    
    mapping(uint256 => Transaction) public transactions;
    mapping(address => bool) public proposers;
    mapping(address => bool) public executors;
    
    event TransactionProposed(uint256 indexed txId, address indexed target, uint256 value, bytes data, uint256 timestamp);
    event TransactionExecuted(uint256 indexed txId, address indexed target, uint256 value, bytes data);
    event TransactionCanceled(uint256 indexed txId);
    event ProposerAdded(address indexed proposer);
    event ProposerRemoved(address indexed proposer);
    event ExecutorAdded(address indexed executor);
    event ExecutorRemoved(address indexed executor);
    
    modifier onlyProposer() {
        require(proposers[msg.sender] || msg.sender == owner(), "Not authorized proposer");
        _;
    }
    
    modifier onlyExecutor() {
        require(executors[msg.sender] || msg.sender == owner(), "Not authorized executor");
        _;
    }
    
    constructor() {
        proposers[msg.sender] = true;
        executors[msg.sender] = true;
    }
    
    function proposeTransaction(
        address target,
        uint256 value,
        bytes memory data,
        uint256 delay
    ) external onlyProposer returns (uint256) {
        require(target != address(0), "Invalid target");
        require(delay >= minDelay && delay <= maxDelay, "Invalid delay");
        
        transactionCount++;
        Transaction storage tx = transactions[transactionCount];
        tx.target = target;
        tx.value = value;
        tx.data = data;
        tx.timestamp = block.timestamp + delay;
        
        emit TransactionProposed(transactionCount, target, value, data, tx.timestamp);
        return transactionCount;
    }
    
    function executeTransaction(uint256 txId) external onlyExecutor {
        Transaction storage tx = transactions[txId];
        require(tx.target != address(0), "Transaction does not exist");
        require(block.timestamp >= tx.timestamp, "Transaction not ready");
        require(!tx.executed, "Transaction already executed");
        require(!tx.canceled, "Transaction canceled");
        
        tx.executed = true;
        
        (bool success, ) = tx.target.call{value: tx.value}(tx.data);
        require(success, "Transaction execution failed");
        
        emit TransactionExecuted(txId, tx.target, tx.value, tx.data);
    }
    
    function cancelTransaction(uint256 txId) external onlyProposer {
        Transaction storage tx = transactions[txId];
        require(tx.target != address(0), "Transaction does not exist");
        require(!tx.executed, "Transaction already executed");
        require(!tx.canceled, "Transaction already canceled");
        require(block.timestamp < tx.timestamp, "Transaction already ready");
        
        tx.canceled = true;
        emit TransactionCanceled(txId);
    }
    
    function addProposer(address proposer) external onlyOwner {
        require(proposer != address(0), "Invalid proposer address");
        proposers[proposer] = true;
        emit ProposerAdded(proposer);
    }
    
    function removeProposer(address proposer) external onlyOwner {
        require(proposer != owner(), "Cannot remove owner as proposer");
        proposers[proposer] = false;
        emit ProposerRemoved(proposer);
    }
    
    function addExecutor(address executor) external onlyOwner {
        require(executor != address(0), "Invalid executor address");
        executors[executor] = true;
        emit ExecutorAdded(executor);
    }
    
    function removeExecutor(address executor) external onlyOwner {
        require(executor != owner(), "Cannot remove owner as executor");
        executors[executor] = false;
        emit ExecutorRemoved(executor);
    }
    
    function setMinDelay(uint256 _minDelay) external onlyOwner {
        require(_minDelay < maxDelay, "Min delay must be less than max delay");
        minDelay = _minDelay;
    }
    
    function setMaxDelay(uint256 _maxDelay) external onlyOwner {
        require(_maxDelay > minDelay, "Max delay must be greater than min delay");
        maxDelay = _maxDelay;
    }
    
    function getTransaction(uint256 txId) external view returns (
        address target,
        uint256 value,
        bytes memory data,
        uint256 timestamp,
        bool executed,
        bool canceled
    ) {
        Transaction storage tx = transactions[txId];
        return (
            tx.target,
            tx.value,
            tx.data,
            tx.timestamp,
            tx.executed,
            tx.canceled
        );
    }
    
    function isTransactionReady(uint256 txId) external view returns (bool) {
        Transaction storage tx = transactions[txId];
        return tx.target != address(0) && 
               block.timestamp >= tx.timestamp && 
               !tx.executed && 
               !tx.canceled;
    }
    
    receive() external payable {}
} 