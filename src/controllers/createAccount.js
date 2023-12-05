// var include=require('./deployContract')
var include1=require('../models/abi')
const Web3 = require("web3");
const Deploy=require("../models/DBSchema");
exports.Create = async(req, res,) => {
  try{
    const m=req.body;
    const data=await Deploy.findOne({"_id":m.id},'contract_Address , private_key');
    const web3 = new Web3(
      new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
      //new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
    );
    console.log("please wait the transaction is in the process")
    const signer = web3.eth.accounts.privateKeyToAccount(data.private_key);
    web3.eth.accounts.wallet.add(signer);
    var myContract = new web3.eth.Contract(include1.ABI, data.contract_Address);
    var oldvalue = await myContract.methods.createAcc().send({from: signer.address, gasPrice: "2000000000", gasLimit: "3000000"});
    console.log(oldvalue)
    res.status(201).send({"status code":"201",
                          "status":"Created",
                          message:"Account Created Successfully",
                          "data":oldvalue                                
                    })
  }catch(err){
    console.log(err)
    res.status(err.status || 500).send({"status code":"500",
    "status":"Internal Server Error",
    message:"Account Creation Failed",
    "data":{"message":err.message,
    "details":err}                                
});
    
  }
}