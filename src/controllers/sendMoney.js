const Web3 = require("web3");
var include=require("./deployContract")
var include1=require('../models/abi')
const sendAmt=require("../models/DBSchema")
const Deploy=require("../models/DBSchema");
exports.sendAmount=async(req,res)=>{
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
    var oldValue=await myContract.methods.sendAmount(m.startupWallet,m.pyriumWallet,m.amount).send({from: signer.address,to:include1.ABI, gasPrice: "2000000000", gasLimit: "3000000"});
    console.log(oldValue)
    if(!oldValue){
      console.log("")
    }else{
      const amt=new sendAmt.sd({
        "startupWallet":m.startupWallet,
        "pyriumWallet":m.pyriumWallet,
        "amount":m.amount,
        "contract_Address":data.contract_Address,
    })
    const Send=await amt.save();
    console.log(Send);
    res.status(200).send({"status code":"200",
    "status":"Ok",
    message:"Amount Transfer Successfully",
    "data": {"transaction details":oldValue}                              
})
    }
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