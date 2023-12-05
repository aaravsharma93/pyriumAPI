var include=require('./deployContract')
const Web3 = require("web3");
exports.Logout=async(req,res)=>{
    try{
        const web3 = include.dweb3;
        var myContract = new web3.eth.Contract(include.abi1, include.conadd);
        var oldValue=await myContract.methods.logout().send({from: include.sadd,to:include.abi1, gasPrice: "2000000000", gasLimit: "3000000"
    });
        console.log(oldValue);
        res.send(oldValue);
    }catch(e){console.log(e)}
}