// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LotteryContract is Ownable, ReentrancyGuard {
    struct Lottery {
        uint256 id;
        uint256 ticketPrice;
        uint256 maxTickets;
        uint256 soldTickets;
        uint256 prizePool;
        uint256 endTime;
        bool drawn;
        address winner;
        mapping(address => uint256) tickets;
    }
    
    uint256 public lotteryCount;
    uint256 public minTicketPrice = 0.01 ether;
    uint256 public maxTicketPrice = 1 ether;
    uint256 public platformFee = 500; // 5% = 500 basis points
    
    mapping(uint256 => Lottery) public lotteries;
    
    event LotteryCreated(uint256 indexed lotteryId, uint256 ticketPrice, uint256 maxTickets, uint256 endTime);
    event TicketPurchased(uint256 indexed lotteryId, address indexed buyer, uint256 ticketCount);
    event LotteryDrawn(uint256 indexed lotteryId, address indexed winner, uint256 prize);
    event PrizeClaimed(uint256 indexed lotteryId, address indexed winner, uint256 amount);
    
    function createLottery(
        uint256 ticketPrice,
        uint256 maxTickets,
        uint256 duration
    ) external onlyOwner returns (uint256) {
        require(ticketPrice >= minTicketPrice && ticketPrice <= maxTicketPrice, "Invalid ticket price");
        require(maxTickets > 0, "Max tickets must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");
        
        lotteryCount++;
        Lottery storage lottery = lotteries[lotteryCount];
        lottery.id = lotteryCount;
        lottery.ticketPrice = ticketPrice;
        lottery.maxTickets = maxTickets;
        lottery.endTime = block.timestamp + duration;
        
        emit LotteryCreated(lotteryCount, ticketPrice, maxTickets, lottery.endTime);
        return lotteryCount;
    }
    
    function buyTickets(uint256 lotteryId, uint256 ticketCount) external payable nonReentrant {
        Lottery storage lottery = lotteries[lotteryId];
        require(block.timestamp < lottery.endTime, "Lottery ended");
        require(!lottery.drawn, "Lottery already drawn");
        require(lottery.soldTickets + ticketCount <= lottery.maxTickets, "Exceeds max tickets");
        require(msg.value == lottery.ticketPrice * ticketCount, "Incorrect payment amount");
        
        lottery.tickets[msg.sender] += ticketCount;
        lottery.soldTickets += ticketCount;
        lottery.prizePool += msg.value;
        
        emit TicketPurchased(lotteryId, msg.sender, ticketCount);
    }
    
    function drawLottery(uint256 lotteryId) external onlyOwner {
        Lottery storage lottery = lotteries[lotteryId];
        require(block.timestamp >= lottery.endTime, "Lottery not ended");
        require(!lottery.drawn, "Already drawn");
        require(lottery.soldTickets > 0, "No tickets sold");
        
        lottery.drawn = true;
        
        // Simple random selection (not cryptographically secure)
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.difficulty,
            lottery.soldTickets
        )));
        
        uint256 winningTicket = (randomNumber % lottery.soldTickets) + 1;
        address winner = findWinner(lotteryId, winningTicket);
        
        lottery.winner = winner;
        
        emit LotteryDrawn(lotteryId, winner, lottery.prizePool);
    }
    
    function claimPrize(uint256 lotteryId) external nonReentrant {
        Lottery storage lottery = lotteries[lotteryId];
        require(lottery.drawn, "Lottery not drawn");
        require(msg.sender == lottery.winner, "Not the winner");
        require(lottery.prizePool > 0, "Prize already claimed");
        
        uint256 platformFeeAmount = (lottery.prizePool * platformFee) / 10000;
        uint256 winnerAmount = lottery.prizePool - platformFeeAmount;
        
        lottery.prizePool = 0;
        
        payable(msg.sender).transfer(winnerAmount);
        payable(owner()).transfer(platformFeeAmount);
        
        emit PrizeClaimed(lotteryId, msg.sender, winnerAmount);
    }
    
    function findWinner(uint256 lotteryId, uint256 winningTicket) internal view returns (address) {
        Lottery storage lottery = lotteries[lotteryId];
        uint256 currentTicket = 0;
        
        // This is a simplified implementation
        // In a real scenario, you'd want to maintain a list of participants
        for (uint256 i = 0; i < lottery.soldTickets; i++) {
            currentTicket += 1;
            if (currentTicket == winningTicket) {
                // Return a deterministic address based on the ticket
                return address(uint160(uint256(keccak256(abi.encodePacked(lotteryId, i)))));
            }
        }
        
        return address(0);
    }
    
    function getLottery(uint256 lotteryId) external view returns (
        uint256 id,
        uint256 ticketPrice,
        uint256 maxTickets,
        uint256 soldTickets,
        uint256 prizePool,
        uint256 endTime,
        bool drawn,
        address winner
    ) {
        Lottery storage lottery = lotteries[lotteryId];
        return (
            lottery.id,
            lottery.ticketPrice,
            lottery.maxTickets,
            lottery.soldTickets,
            lottery.prizePool,
            lottery.endTime,
            lottery.drawn,
            lottery.winner
        );
    }
    
    function getTickets(uint256 lotteryId, address participant) external view returns (uint256) {
        return lotteries[lotteryId].tickets[participant];
    }
    
    function setTicketPriceLimits(uint256 _minPrice, uint256 _maxPrice) external onlyOwner {
        require(_minPrice < _maxPrice, "Min price must be less than max price");
        minTicketPrice = _minPrice;
        maxTicketPrice = _maxPrice;
    }
    
    function setPlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 1000, "Fee cannot exceed 10%");
        platformFee = _platformFee;
    }
} 