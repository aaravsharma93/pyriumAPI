var include=require('./deployContract')
var include1=require('../models/abi')
const Web3 = require("web3");
const Deploy=require("../models/DBSchema");
exports.WithDraw=async(req,res)=>{
  try{
      const m=req.body;
      const data=await Deploy.findOne({"_id":m.id},'contract_Address , private_key');
      const web3 = new Web3(
        new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
        //new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
      );
      const signer = web3.eth.accounts.privateKeyToAccount(data.private_key);
      web3.eth.accounts.wallet.add(signer);
      var myContract = new web3.eth.Contract(include1.ABI, data.contract_Address);
      const weiValue = Web3.utils.toWei(m.amount, 'ether');
      var oldValue=await myContract.methods.withdraw(weiValue).send({from: signer.address,to:include1.ABI,gasPrice: "2000000000", gasLimit: "3000000"});
      console.log(oldValue)
      res.status(202).send({"status code":"202",
      "status":"Accepted",
      message:"Withdraw Successfully",
      "data": {"transaction details":oldValue}                              
  })
  }catch(err){
    console.log(err)
    res.status(err.status || 500).send({"status code":"500",
    "status":"Internal Server Error",
     message:"Failed",
     "data":{"message":err.message,
     "details":err
}                                
});
  }
}