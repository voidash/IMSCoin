pragma solidity ^0.5.0;

/*
Author : Ashish Thapa
For Sem Project 
*/
contract IMSToken{ 
    string public name = "IMSToken";
    string public symbol = "IMST";
    
    uint public totalSupply = 1000000000000000000000000000;// billion tokens
    
    // 1 IMS Token can be divided into 10^18 pieces.
    uint public decimals = 18;
    
    event Transfer (
        address indexed _from,
        address indexed _to,
        uint value
    );
    
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint value
        );
        
        mapping(address => uint256) public balanceOf;
        mapping(address => mapping(address=> uint256)) public allowance;
        
        constructor() public {
            // address who instantiates the constructor gets full balance;
            balanceOf[msg.sender] = totalSupply;
        }
        
        function transfer(address _to, uint256 _value) public returns (bool success) {
            require(balanceOf[msg.sender] >= _value);
            balanceOf[msg.sender] -= _value;
            balanceOf[_to] += _value;
            emit Transfer(msg.sender, _to, _value);
            return true;
        }
        
        function approve(address _to, uint256 _value) public returns (bool success) {
            allowance[msg.sender][_to] =_value;
            emit Approval(msg.sender, _to, _value);
            return true;
        }
        
        function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
            require(_value <= balanceOf[_from]);
            require(_value <= allowance[_from][_to]);
            
            balanceOf[_from] -= _value;
            balanceOf[_to] +=  _value;
            allowance[_from][_to] -= _value;
            emit Transfer(_from, _to, _value);
            return true;
        }
        
}