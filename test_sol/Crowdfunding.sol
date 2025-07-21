// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Crowdfunding is Ownable, ReentrancyGuard {
    struct Campaign {
        uint256 id;
        address payable creator;
        string title;
        string description;
        uint256 goal;
        uint256 raised;
        uint256 deadline;
        bool claimed;
        bool canceled;
        mapping(address => uint256) contributions;
    }
    
    uint256 public campaignCount;
    uint256 public platformFee = 500; // 5% = 500 basis points
    
    mapping(uint256 => Campaign) public campaigns;
    
    event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goal, uint256 deadline);
    event ContributionMade(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event FundsClaimed(uint256 indexed campaignId, address indexed creator, uint256 amount);
    event RefundIssued(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event CampaignCanceled(uint256 indexed campaignId);
    
    function createCampaign(
        string memory title,
        string memory description,
        uint256 goal,
        uint256 duration
    ) external returns (uint256) {
        require(goal > 0, "Goal must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");
        
        campaignCount++;
        Campaign storage campaign = campaigns[campaignCount];
        campaign.id = campaignCount;
        campaign.creator = payable(msg.sender);
        campaign.title = title;
        campaign.description = description;
        campaign.goal = goal;
        campaign.deadline = block.timestamp + duration;
        
        emit CampaignCreated(campaignCount, msg.sender, title, goal, campaign.deadline);
        return campaignCount;
    }
    
    function contribute(uint256 campaignId) external payable nonReentrant {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp < campaign.deadline, "Campaign ended");
        require(!campaign.canceled, "Campaign canceled");
        require(msg.value > 0, "Contribution must be greater than 0");
        
        campaign.contributions[msg.sender] += msg.value;
        campaign.raised += msg.value;
        
        emit ContributionMade(campaignId, msg.sender, msg.value);
    }
    
    function claimFunds(uint256 campaignId) external nonReentrant {
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.creator, "Only creator can claim");
        require(block.timestamp >= campaign.deadline, "Campaign not ended");
        require(!campaign.claimed, "Already claimed");
        require(!campaign.canceled, "Campaign canceled");
        require(campaign.raised >= campaign.goal, "Goal not reached");
        
        campaign.claimed = true;
        uint256 platformFeeAmount = (campaign.raised * platformFee) / 10000;
        uint256 creatorAmount = campaign.raised - platformFeeAmount;
        
        campaign.creator.transfer(creatorAmount);
        payable(owner()).transfer(platformFeeAmount);
        
        emit FundsClaimed(campaignId, msg.sender, creatorAmount);
    }
    
    function refund(uint256 campaignId) external nonReentrant {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign not ended");
        require(!campaign.claimed, "Funds already claimed");
        require(campaign.raised < campaign.goal, "Goal reached");
        
        uint256 contribution = campaign.contributions[msg.sender];
        require(contribution > 0, "No contribution to refund");
        
        campaign.contributions[msg.sender] = 0;
        campaign.raised -= contribution;
        
        payable(msg.sender).transfer(contribution);
        emit RefundIssued(campaignId, msg.sender, contribution);
    }
    
    function cancelCampaign(uint256 campaignId) external {
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.creator, "Only creator can cancel");
        require(block.timestamp < campaign.deadline, "Campaign already ended");
        require(!campaign.canceled, "Already canceled");
        
        campaign.canceled = true;
        emit CampaignCanceled(campaignId);
    }
    
    function getCampaign(uint256 campaignId) external view returns (
        uint256 id,
        address creator,
        string memory title,
        string memory description,
        uint256 goal,
        uint256 raised,
        uint256 deadline,
        bool claimed,
        bool canceled
    ) {
        Campaign storage campaign = campaigns[campaignId];
        return (
            campaign.id,
            campaign.creator,
            campaign.title,
            campaign.description,
            campaign.goal,
            campaign.raised,
            campaign.deadline,
            campaign.claimed,
            campaign.canceled
        );
    }
    
    function getContribution(uint256 campaignId, address contributor) external view returns (uint256) {
        return campaigns[campaignId].contributions[contributor];
    }
    
    function setPlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 1000, "Fee cannot exceed 10%");
        platformFee = _platformFee;
    }
} 