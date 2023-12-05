// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
contract owned{
    mapping(address=>uint)public  userAccount;
    mapping(address=>bool)public  userExists;
    mapping(uint=>Details) public Data;

    //**declaring a struct**//
    struct Details{
        uint fund;
        address payable add;
    }

    //calling a struct
    Details detail;

    uint8 i=1;
    uint256 f=0;
    uint8 number;
    uint256 total=95;
    uint256 amount1;
    uint256 amount2;
    uint256 famt;
    modifier onlyOwner(){
        require(userExists[msg.sender]==true, 'Account is not created');
        _;
    }
    event amountTransfer(address _from,address _toStartUp,address _toPyrium,uint256 amount);
}