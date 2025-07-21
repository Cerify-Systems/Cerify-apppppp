// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOGovernance is Ownable {
    IERC20 public governanceToken;
    
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        bool canceled;
        mapping(address => bool) hasVoted;
        mapping(address => bool) support;
    }
    
    uint256 public proposalCount;
    uint256 public votingDelay = 1;
    uint256 public votingPeriod = 7 days;
    uint256 public quorumVotes = 1000 * 10**18; // 1000 tokens
    
    mapping(uint256 => Proposal) public proposals;
    
    event ProposalCreated(uint256 indexed proposalId, address proposer, string description);
    event Voted(uint256 indexed proposalId, address voter, bool support, uint256 votes);
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCanceled(uint256 indexed proposalId);
    
    constructor(address _governanceToken) {
        governanceToken = IERC20(_governanceToken);
    }
    
    function createProposal(string memory description) external returns (uint256) {
        require(governanceToken.balanceOf(msg.sender) >= quorumVotes / 10, "Insufficient tokens to propose");
        
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.proposer = msg.sender;
        proposal.description = description;
        proposal.startTime = block.timestamp + votingDelay;
        proposal.endTime = block.timestamp + votingDelay + votingPeriod;
        
        emit ProposalCreated(proposalCount, msg.sender, description);
        return proposalCount;
    }
    
    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        uint256 votes = governanceToken.balanceOf(msg.sender);
        require(votes > 0, "No voting power");
        
        proposal.hasVoted[msg.sender] = true;
        proposal.support[msg.sender] = support;
        
        if (support) {
            proposal.forVotes += votes;
        } else {
            proposal.againstVotes += votes;
        }
        
        emit Voted(proposalId, msg.sender, support, votes);
    }
    
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Already executed");
        require(!proposal.canceled, "Proposal canceled");
        require(proposal.forVotes + proposal.againstVotes >= quorumVotes, "Quorum not reached");
        require(proposal.forVotes > proposal.againstVotes, "Proposal failed");
        
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }
    
    function cancelProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(msg.sender == proposal.proposer, "Only proposer can cancel");
        require(block.timestamp < proposal.startTime, "Voting already started");
        
        proposal.canceled = true;
        emit ProposalCanceled(proposalId);
    }
    
    function getProposal(uint256 proposalId) external view returns (
        uint256 id,
        address proposer,
        string memory description,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 startTime,
        uint256 endTime,
        bool executed,
        bool canceled
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.proposer,
            proposal.description,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.startTime,
            proposal.endTime,
            proposal.executed,
            proposal.canceled
        );
    }
} 