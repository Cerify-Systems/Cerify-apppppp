// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
    // ========== Simple Storage ==========
    uint256 private storedValue;

    /// @notice Store a new value
    function setValue(uint256 _value) external {
        storedValue = _value;
    }

    /// @notice Retrieve the stored value
    function getValue() external view returns (uint256) {
        return storedValue;
    }

    // ========== Vulnerable Wallet ==========
    mapping(address => uint256) public balances;

    /// @notice Deposit ETH into your balance
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    /// @notice Vulnerable withdrawal — transfers before zeroing out balance
    function withdraw(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // ⚠️ Vulnerable to reentrancy: transferring before updating state
        (bool success, ) = msg.sender.call{ value: _amount }("");
        require(success, "Transfer failed");

        balances[msg.sender] -= _amount;
    }

    /// @notice Fallback to accept ETH sent directly
    receive() external payable {
        balances[msg.sender] += msg.value;
    }
}
