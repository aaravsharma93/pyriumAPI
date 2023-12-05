// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import './owned.sol';
contract money is owned{
    string public message = "Hello World..!. Limit for transfering the amount is 95%";
    function setAdd(uint key,uint256 fund,address payable value)public onlyOwner returns(string memory){
        require(fund<=total,'sry fund percentage too high');
        Data[key]=Details(fund,value);
        number=number+1;
        total=total-fund;
        return "Address Entered Succesfully...";   
    }
    function createAcc() public payable returns(string memory){
        require(userExists[msg.sender]==false,'Account Already Created');
        if(msg.value==0){
            userAccount[msg.sender]=0;
            userExists[msg.sender]=true;
            return 'account created';
        }
        require(userExists[msg.sender]==false,'account already created');
        userAccount[msg.sender] = msg.value;
        userExists[msg.sender] = true;
        return 'account created';
    }
    function deposit() public payable onlyOwner returns(string memory){
        require(msg.value>0, 'Value for deposit is Zero');
        userAccount[msg.sender]=userAccount[msg.sender]+msg.value;
        return 'Deposited Succesfully';
    }
  
    function transfer(uint amount)public payable onlyOwner returns(string memory){
        address payable pWalletAddress= payable(0xD47Cbd1d6CbC61cfc34f9406a8cc71229C33555c);           
        require(amount>0, 'Enter non-zero value for withdrawal');
        uint256 pWallet=((amount*4)/100);
        require(userAccount[msg.sender]>=amount, 'insufficeint balance in account');
        userAccount[msg.sender]-=pWallet;
        pWalletAddress.transfer(pWallet);
        while(i<=number){
                f=((Data[i].fund*amount)/100);
                require(userAccount[msg.sender]>=f, 'insufficeint balance');
                userAccount[msg.sender]=userAccount[msg.sender]-f;
                Data[i].add.transfer(f);
                total=total+Data[i].fund;
                delete(Data[i]);
                i++;
                f=0;
            }
        return 'transfer successfully';     
    }
    function withdraw(uint amount) public payable onlyOwner returns(string memory){
        require(userAccount[msg.sender]>=amount, 'insufficeint balance in account');
        require(amount>0, 'Enter non-zero value for withdrawal');
        userAccount[msg.sender]=userAccount[msg.sender]-amount;
        //msg.sender.transfer(amount);
        payable(msg.sender).transfer(amount);
        return 'withdrawal Succesful';
    }
    function sendAmount(address payable startupWallet,address payable pyriumWallet,uint256 amount) public payable onlyOwner returns(string memory){
        require(amount>0, 'Enter non-zero value for withdrawal');
        require(userAccount[msg.sender]>=amount, 'insufficeint balance in account');
        amount1=((amount*4)/100);
        amount2=((amount*95)/100);
        famt=amount1+amount2;

        userAccount[msg.sender]=userAccount[msg.sender]-famt;
        
        startupWallet.transfer(amount2);
        pyriumWallet.transfer(amount1);
        emit amountTransfer(msg.sender,startupWallet,pyriumWallet,amount);
        return 'transfer success';
    }
    function userAccountBalance() public view returns(uint){
        return userAccount[msg.sender];
    }
        function logout()public onlyOwner {
        if(userAccount[msg.sender]>0){
            uint256 amount=userAccount[msg.sender];
            userAccount[msg.sender]=userAccount[msg.sender]-amount;
            payable(msg.sender).transfer(amount);  
        }
        userExists[msg.sender]=false;
    }
}