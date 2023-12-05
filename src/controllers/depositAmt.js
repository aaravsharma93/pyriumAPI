// var include=require('./deployContract')
var include1=require('../models/abi')
const Web3 = require("web3");
const Deploy=require("../models/DBSchema");
exports.Deposit=async(req,res)=>{
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
      console.log(weiValue)
      var oldvalue = await myContract.methods.deposit().send({from: signer.address,to:include1.ABI, gasPrice: "2000000000", gasLimit: "3000000",value:weiValue });
      console.log(oldvalue,"=====")
      res.status(202).send({"status code":"202",
      "status":"Accepted",
      message:"Deposit Successfully",
              "data":{"value in ether":m.amount,
                      "value in wei":weiValue},
                      "details":oldvalue                                
})
  }catch(e){
      console.log(e)
      res.status(err.status || 500).send({"status code":"500",
         "status":"Internal Server Error",
          message:"Failed",
          "data":{"message":err.message,
          "details":err
    }                                
  });
  }
}
