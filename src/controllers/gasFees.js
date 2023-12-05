const CoinGecko = require ('coingecko-api');
var include1=require('../models/abi')
var include=require('./deployContract')
const Web3 = require("web3");
exports.GasFee=async(req,res)=>{
    try{
        const web3 = new Web3(
            new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
            );
        const signer = web3.eth.accounts.privateKeyToAccount(
            "1362f9800a0403cf829f9a5b0eddeacf0ea97420638ab1b89690a45d7b8260fb"
        );
        await web3.eth.accounts.wallet.add(signer); 
        // const coinGeckoClient = new CoinGecko();
        // const responseBNB = await coinGeckoClient.coins.fetch('binancecoin',{});
        // let currentPriceBNB = 
        // parseFloat(responseBNB.data.market_data.current_price.usd);
        const m=req.body;
        console.log(m)
        // const web3 = include.dweb3;
        // web3.eth.getGasPrice().then((gas)=>{
        //     console.log("gasPrice",gas)
        // });
        var myContract = new web3.eth.Contract(include1.ABI, m.conAdd);
        const gasPrice1= await myContract.methods.createAcc().estimateGas({ from: m.add})
       
        // console.log("Gas Price for Creating the Account",gasPrice2)
        // const gasPrice1 = await myContract.methods.setAdd(m.value,m.fundPercentage,m.address).estimateGas({ from: include.sadd});
        // console.log("Gas Price for Setting the Wallet Addresses",gasPrice1)
        
        // const gasPrice3 = await myContract.methods.deposit().estimateGas({ from: include.sadd,value:m.amount});
        // console.log("Gas Price for Deposit",gasPrice3)
        
        // const gasPrice4 = await myContract.methods.transfer(m.amount).estimateGas({ from: include.sadd});
        // console.log("Gas Price for Transfering the Funds",gasPrice4)
        
        // const gasPrice5 = await myContract.methods.withdraw(m.amount).estimateGas({ from: include.sadd});
        // console.log("Gas Price for Withdraw the amount",gasPrice5)
        const latestBlock  = await web3.eth.getBlock('latest');
        console.log("latest Block",latestBlock)
        const blockGas = latestBlock.gasLimit;
        console.log("Block Gas",blockGas)
        const finalGas = (blockGas * gasPrice1);
        console.log("Final Gas",finalGas)
        // const finalGasInEther = web3.utils.fromWei(finalGas.toString(), 'ether');
        // console.log("Final Gas In Ether",finalGasInEther)
        // const USDResult = (Number(finalGasInEther) * currentPriceBNB) * 100;
        // console.log("USD Result",USDResult)
    }catch(e){
        console.log(e)
        // res.status(e.status || 500).json({
        //     message: e.message,
        //     error: {},
        //   });
    }
}