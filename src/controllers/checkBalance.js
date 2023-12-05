// var include=require('./deployContract')
var include1=require('../models/abi')
const Web3 = require("web3");
const Deploy=require("../models/DBSchema");
exports.CheckBalance=async(req,res)=>{
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
      var oldValue=await myContract.methods.userAccount(signer.address).call();
      const etherValue = Web3.utils.fromWei(oldValue, 'ether')
      console.log("value in ether ",etherValue,"value in Wei ",oldValue)
      // res.send({"value in ether ":etherValue,"value in Wei ":oldValue})
      res.status(200).send({"status code":"200",
                          "status":"Ok",
                          message:"Balance Fetch Successfully",
                          "data":{"value in ether ":etherValue,
                                  "value in Wei ":oldValue
                            }                               
})
  }catch(err){
    console.log(err)
    res.status(err.status || 500).send({"status code":"500",
    "status":"Internal Server Error",
    message:"Failed",
    "data":{"message":err.message,
    "details":err}                                
});
}
}