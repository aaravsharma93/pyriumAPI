const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require("web3");
// var include1=require('../models/abi')

    const inboxpath1 = path.resolve(__dirname,'Contracts','owned.sol');
    const owned = fs.readFileSync(inboxpath1);
    const inboxpath = path.resolve(__dirname,'Contracts','money.sol');
    console.log("inboxpath",inboxpath);
    const source = fs.readFileSync(inboxpath, 'UTF-8');
    console.log(source)
    
    // fs.ensureDirSync(buildPath);
    console.log("__dirname",__dirname);
    const input = {
    language: "Solidity",
    sources: {
        'money.sol': {
            content: source
        }
    },
    settings: {
        optimizer:{
            enabled:true
        },
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }              
    };
    function findImports(path) {
        if (path === __dirname,"/contracts/owned.sol") return { contents: `${owned}` };
        else return { error: "File not found" };
    }
    const output = JSON.parse(solc.compile(JSON.stringify(input),{ import: findImports }));
    console.log("here is output",output);

    const contractFile = output.contracts['money.sol']['money'];
    console.log("2")

    const bytecode=  contractFile.evm.bytecode.object;
    const abi = contractFile.abi;
    console.log("ABI",abi);
    console.log("Bytecode",bytecode);
    console.log("please wait deployment of smart contract is in the process")
    
    const web3 = new Web3(
        new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
    );
    const privateKey="1362f9800a0403cf829f9a5b0eddeacf0ea97420638ab1b89690a45d7b8260fb";
    const signer = web3.eth.accounts.privateKeyToAccount(
        privateKey
    );
    // contract = new web3.eth.Contract(abi);
  
    web3.eth.accounts.wallet.add(signer);
    // console.log("address->",signer.address)
    // contract
    //     .deploy({ data: bytecode })
    //     .send({ from: signer.address, gas: 4700000 })
    //     .on("receipt", (receipt) => {

    //     // Contract Address will be returned here
    //     console.log("Contract Address:", receipt.contractAddress);
    //     })
    //     .then((moneyContract) => {
    //             moneyContract.methods.message().call(async (err, data1) => {
    //             console.log("Initial Data:",data1)
    //         });
            
    // });
    const wallet=web3.eth.accounts.wallet;
    console.log("this is the private key :-",wallet[0].privateKey)
    // const addhoja=web3.eth.accounts.wallet.add("0xC554db17Dd884A669E2580ffd81E011F1B8F8d68");
    // console.log(addhoja)
    // const create=web3.eth.accounts.create();
    // console.log(create.privateKey)
    // const accounts=web3.eth.getAccounts().then(console.log)
//     web3.eth.getHashrate()
// .then(console.log);

// web3.shh.subscribe('messages', {
//     symKeyID: 'bf31b9ffc2387e18636e0a3d0c56b023264c16e78a2adcba1303cefc685e610f',
//     sig: '0x04d1574d4eab8f3dde4d2dc7ed2c4d699d77cbbdd09167b8fffa099652ce4df00c4c6e0263eafe05007a46fdf0c8d32b11aeabcd3abbc7b2bc2bb967368a68e9c6',
//     ttl: 20,
//     topics: ['0xffddaa11'],
//     minPow: 0.8,
// }, function(error, message, subscription){

//     console.log(message);})
    // const web3 = new Web3(
    //   new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
    //   );
    // console.log("hshshshs",web3)
    // const privateKey="1362f9800a0403cf829f9a5b0eddeacf0ea97420638ab1b89690a45d7b8260fb";
    // const signer = web3.eth.accounts.privateKeyToAccount(
    //     privateKey
    // );
    
    // web3.eth.accounts.wallet.add(signer);
    // console.log("please wait the transaction is in the process")
    // const contractAdd="0x806D8C3f87dee51F3160dF49b063cE4870163A13";
    // const add="0xC554db17Dd884A669E2580ffd81E011F1B8F8d68";
    // var myContract = new web3.eth.Contract(include1.ABI, contractAdd);
    // var oldvalue =  myContract.methods.createAcc().send({from: add, gasPrice: "2000000000", gasLimit: "3000000"});
    // console.log("hahahahah",oldvalue)
