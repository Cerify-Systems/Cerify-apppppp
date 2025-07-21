// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EscrowContract is Ownable, ReentrancyGuard {
    struct Escrow {
        uint256 id;
        address buyer;
        address seller;
        uint256 amount;
        uint256 deadline;
        bool released;
        bool refunded;
        bool disputed;
        string description;
    }
    
    uint256 public escrowCount;
    uint256 public platformFee = 300; // 3% = 300 basis points
    uint256 public disputePeriod = 7 days;
    
    mapping(uint256 => Escrow) public escrows;
    
    event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount, string description);
    event FundsReleased(uint256 indexed escrowId, address indexed seller, uint256 amount);
    event FundsRefunded(uint256 indexed escrowId, address indexed buyer, uint256 amount);
    event DisputeRaised(uint256 indexed escrowId, address indexed disputer);
    event DisputeResolved(uint256 indexed escrowId, bool releasedToSeller);
    
    function createEscrow(
        address seller,
        string memory description,
        uint256 duration
    ) external payable returns (uint256) {
        require(seller != address(0), "Invalid seller address");
        require(seller != msg.sender, "Cannot create escrow with yourself");
        require(msg.value > 0, "Amount must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");
        
        escrowCount++;
        Escrow storage escrow = escrows[escrowCount];
        escrow.id = escrowCount;
        escrow.buyer = msg.sender;
        escrow.seller = seller;
        escrow.amount = msg.value;
        escrow.deadline = block.timestamp + duration;
        escrow.description = description;
        
        emit EscrowCreated(escrowCount, msg.sender, seller, msg.value, description);
        return escrowCount;
    }
    
    function releaseFunds(uint256 escrowId) external nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        require(msg.sender == escrow.buyer, "Only buyer can release funds");
        require(!escrow.released, "Funds already released");
        require(!escrow.refunded, "Funds already refunded");
        require(!escrow.disputed, "Escrow is disputed");
        
        escrow.released = true;
        uint256 platformFeeAmount = (escrow.amount * platformFee) / 10000;
        uint256 sellerAmount = escrow.amount - platformFeeAmount;
        
        payable(escrow.seller).transfer(sellerAmount);
        payable(owner()).transfer(platformFeeAmount);
        
        emit FundsReleased(escrowId, escrow.seller, sellerAmount);
    }
    
    function refundBuyer(uint256 escrowId) external nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        require(msg.sender == escrow.seller, "Only seller can refund");
        require(!escrow.released, "Funds already released");
        require(!escrow.refunded, "Funds already refunded");
        require(!escrow.disputed, "Escrow is disputed");
        
        escrow.refunded = true;
        uint256 platformFeeAmount = (escrow.amount * platformFee) / 10000;
        uint256 buyerAmount = escrow.amount - platformFeeAmount;
        
        payable(escrow.buyer).transfer(buyerAmount);
        payable(owner()).transfer(platformFeeAmount);
        
        emit FundsRefunded(escrowId, escrow.buyer, buyerAmount);
    }
    
    function raiseDispute(uint256 escrowId) external {
        Escrow storage escrow = escrows[escrowId];
        require(msg.sender == escrow.buyer || msg.sender == escrow.seller, "Not authorized");
        require(!escrow.released, "Funds already released");
        require(!escrow.refunded, "Funds already refunded");
        require(!escrow.disputed, "Dispute already raised");
        
        escrow.disputed = true;
        emit DisputeRaised(escrowId, msg.sender);
    }
    
    function resolveDispute(uint256 escrowId, bool releaseToSeller) external onlyOwner nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.disputed, "No dispute to resolve");
        require(!escrow.released, "Funds already released");
        require(!escrow.refunded, "Funds already refunded");
        
        uint256 platformFeeAmount = (escrow.amount * platformFee) / 10000;
        uint256 recipientAmount = escrow.amount - platformFeeAmount;
        
        if (releaseToSeller) {
            escrow.released = true;
            payable(escrow.seller).transfer(recipientAmount);
            emit FundsReleased(escrowId, escrow.seller, recipientAmount);
        } else {
            escrow.refunded = true;
            payable(escrow.buyer).transfer(recipientAmount);
            emit FundsRefunded(escrowId, escrow.buyer, recipientAmount);
        }
        
        payable(owner()).transfer(platformFeeAmount);
        emit DisputeResolved(escrowId, releaseToSeller);
    }
    
    function getEscrow(uint256 escrowId) external view returns (
        uint256 id,
        address buyer,
        address seller,
        uint256 amount,
        uint256 deadline,
        bool released,
        bool refunded,
        bool disputed,
        string memory description
    ) {
        Escrow storage escrow = escrows[escrowId];
        return (
            escrow.id,
            escrow.buyer,
            escrow.seller,
            escrow.amount,
            escrow.deadline,
            escrow.released,
            escrow.refunded,
            escrow.disputed,
            escrow.description
        );
    }
    
    function setPlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 500, "Fee cannot exceed 5%");
        platformFee = _platformFee;
    }
    
    function setDisputePeriod(uint256 _disputePeriod) external onlyOwner {
        require(_disputePeriod > 0, "Dispute period must be greater than 0");
        disputePeriod = _disputePeriod;
    }
} 