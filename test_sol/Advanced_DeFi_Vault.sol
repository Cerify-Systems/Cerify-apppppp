// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract AdvancedDeFiVault is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    
    struct Strategy {
        address strategy;
        uint256 allocation;
        bool active;
        uint256 lastHarvest;
        uint256 totalHarvested;
    }
    
    struct UserInfo {
        uint256 shares;
        uint256 lastDeposit;
        uint256 rewards;
        uint256 lastClaim;
    }
    
    IERC20 public immutable underlying;
    string public name;
    string public symbol;
    uint8 public decimals;
    
    uint256 public totalShares;
    uint256 public totalAssets;
    uint256 public performanceFee = 2000; // 20% = 2000 basis points
    uint256 public managementFee = 200; // 2% = 200 basis points
    uint256 public lastHarvest;
    uint256 public harvestInterval = 1 days;
    
    mapping(address => Strategy) public strategies;
    mapping(address => UserInfo) public userInfo;
    address[] public strategyList;
    
    event Deposit(address indexed user, uint256 assets, uint256 shares);
    event Withdraw(address indexed user, uint256 assets, uint256 shares);
    event StrategyAdded(address indexed strategy, uint256 allocation);
    event StrategyRemoved(address indexed strategy);
    event Harvest(address indexed strategy, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event FeesCollected(uint256 performanceFee, uint256 managementFee);
    
    constructor(
        address _underlying,
        string memory _name,
        string memory _symbol
    ) {
        underlying = IERC20(_underlying);
        name = _name;
        symbol = _symbol;
        decimals = IERC20(_underlying).decimals();
    }
    
    function deposit(uint256 assets) external nonReentrant whenNotPaused returns (uint256 shares) {
        require(assets > 0, "Cannot deposit 0");
        
        shares = convertToShares(assets);
        require(shares > 0, "Invalid shares");
        
        totalAssets += assets;
        totalShares += shares;
        
        UserInfo storage user = userInfo[msg.sender];
        user.shares += shares;
        user.lastDeposit = block.timestamp;
        
        underlying.safeTransferFrom(msg.sender, address(this), assets);
        
        emit Deposit(msg.sender, assets, shares);
    }
    
    function withdraw(uint256 shares) external nonReentrant returns (uint256 assets) {
        require(shares > 0, "Cannot withdraw 0");
        
        UserInfo storage user = userInfo[msg.sender];
        require(user.shares >= shares, "Insufficient shares");
        
        assets = convertToAssets(shares);
        require(assets > 0, "Invalid assets");
        
        totalAssets -= assets;
        totalShares -= shares;
        user.shares -= shares;
        
        underlying.safeTransfer(msg.sender, assets);
        
        emit Withdraw(msg.sender, assets, shares);
    }
    
    function addStrategy(address strategy, uint256 allocation) external onlyOwner {
        require(strategy != address(0), "Invalid strategy");
        require(allocation > 0 && allocation <= 10000, "Invalid allocation");
        require(!strategies[strategy].active, "Strategy already exists");
        
        strategies[strategy] = Strategy({
            strategy: strategy,
            allocation: allocation,
            active: true,
            lastHarvest: block.timestamp,
            totalHarvested: 0
        });
        
        strategyList.push(strategy);
        emit StrategyAdded(strategy, allocation);
    }
    
    function removeStrategy(address strategy) external onlyOwner {
        require(strategies[strategy].active, "Strategy not found");
        
        strategies[strategy].active = false;
        
        for (uint256 i = 0; i < strategyList.length; i++) {
            if (strategyList[i] == strategy) {
                strategyList[i] = strategyList[strategyList.length - 1];
                strategyList.pop();
                break;
            }
        }
        
        emit StrategyRemoved(strategy);
    }
    
    function harvest() external {
        require(block.timestamp >= lastHarvest + harvestInterval, "Too early to harvest");
        
        uint256 totalHarvested = 0;
        
        for (uint256 i = 0; i < strategyList.length; i++) {
            address strategy = strategyList[i];
            if (strategies[strategy].active) {
                uint256 harvested = _harvestStrategy(strategy);
                totalHarvested += harvested;
            }
        }
        
        if (totalHarvested > 0) {
            _distributeRewards(totalHarvested);
            lastHarvest = block.timestamp;
        }
    }
    
    function claimRewards() external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        require(user.shares > 0, "No shares");
        
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");
        
        user.rewards = 0;
        user.lastClaim = block.timestamp;
        
        underlying.safeTransfer(msg.sender, rewards);
        emit RewardsClaimed(msg.sender, rewards);
    }
    
    function convertToShares(uint256 assets) public view returns (uint256) {
        if (totalShares == 0) {
            return assets;
        }
        return (assets * totalShares) / totalAssets;
    }
    
    function convertToAssets(uint256 shares) public view returns (uint256) {
        if (totalShares == 0) {
            return 0;
        }
        return (shares * totalAssets) / totalShares;
    }
    
    function calculateRewards(address user) public view returns (uint256) {
        UserInfo storage userInfo_ = userInfo[user];
        if (userInfo_.shares == 0) return 0;
        
        uint256 timeSinceLastClaim = block.timestamp - userInfo_.lastClaim;
        uint256 userShare = (userInfo_.shares * 1e18) / totalShares;
        
        return (userShare * timeSinceLastClaim) / 1e18;
    }
    
    function _harvestStrategy(address strategy) internal returns (uint256) {
        // Simulate harvesting from strategy
        uint256 harvested = 1000 * 10**decimals; // Mock harvest amount
        strategies[strategy].lastHarvest = block.timestamp;
        strategies[strategy].totalHarvested += harvested;
        
        emit Harvest(strategy, harvested);
        return harvested;
    }
    
    function _distributeRewards(uint256 totalHarvested) internal {
        uint256 performanceFeeAmount = (totalHarvested * performanceFee) / 10000;
        uint256 managementFeeAmount = (totalHarvested * managementFee) / 10000;
        uint256 rewardsAmount = totalHarvested - performanceFeeAmount - managementFeeAmount;
        
        // Distribute rewards to users (simplified)
        totalAssets += rewardsAmount;
        
        // Transfer fees to owner
        if (performanceFeeAmount > 0) {
            underlying.safeTransfer(owner(), performanceFeeAmount);
        }
        if (managementFeeAmount > 0) {
            underlying.safeTransfer(owner(), managementFeeAmount);
        }
        
        emit FeesCollected(performanceFeeAmount, managementFeeAmount);
    }
    
    function setFees(uint256 _performanceFee, uint256 _managementFee) external onlyOwner {
        require(_performanceFee <= 5000, "Performance fee too high");
        require(_managementFee <= 1000, "Management fee too high");
        performanceFee = _performanceFee;
        managementFee = _managementFee;
    }
    
    function setHarvestInterval(uint256 _interval) external onlyOwner {
        require(_interval > 0, "Invalid interval");
        harvestInterval = _interval;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function getStrategyList() external view returns (address[] memory) {
        return strategyList;
    }
    
    function getUserInfo(address user) external view returns (
        uint256 shares,
        uint256 lastDeposit,
        uint256 rewards,
        uint256 lastClaim
    ) {
        UserInfo storage userInfo_ = userInfo[user];
        return (
            userInfo_.shares,
            userInfo_.lastDeposit,
            userInfo_.rewards,
            userInfo_.lastClaim
        );
    }
} 