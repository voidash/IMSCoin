pragma solidity ^0.5.0;

import './IMSToken.sol';

contract TokenMediator{
    IMSToken public imsToken;
    address public owner;
    string public name="Token Mediator";

    constructor(IMSToken _imsToken) public{
        imsToken = _imsToken;
        owner = msg.sender;
    }
    
    function redeemTokens(uint _amount) public {
        require(_amount > 0 , "amount is less than 0");
        imsToken.approve(msg.sender, _amount);
        imsToken.transferFrom(address(this), msg.sender, _amount);
    }
}