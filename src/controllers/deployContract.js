const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require("web3");
const Deploy=require("../models/DBSchema");
const includes=require('../controllers/deployContract');

exports.deployContract = async(req, res) => {
    try{
    const m=req.body;
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
    module.exports.abi1=abi;
    console.log("ABI",abi);
    console.log("Bytecode",bytecode);
    console.log("please wait deployment of smart contract is in the process")
    
    const web3 = new Web3(
        new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
        //new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/d445744d8bbb4f818e52e470cb676f46`)
    );
    module.exports.dweb3=web3;
    const signer = web3.eth.accounts.privateKeyToAccount(
        m.privateKey
    );
    contract = new web3.eth.Contract(abi);
    module.exports.cont=contract;
  
    web3.eth.accounts.wallet.add(signer); 
    module.exports.sadd=signer.address;
    contract
        .deploy({ data: bytecode })
        .send({ from: signer.address, gas: 4700000 })
        .on("receipt", (receipt) => {

        // Contract Address will be returned here
        console.log("Contract Address:", receipt.contractAddress);
        module.exports.conadd=receipt.contractAddress;
        // //it will store the wallet address and contract address into the DB
        try{
            const user=new Deploy({
            "name":m.name,
            "address":signer.address,
            "contract_Address":receipt.contractAddress,
            "private_key":m.privateKey
        });
        const createUser= user.save();
        console.log(createUser);
        }catch(err){
            console.log(err)
        }
        })
        .then(async (moneyContract) => {
                
                moneyContract.methods.message().call(async (err, data1) => {
                console.log("Initial Data:",data1)
                module.exports.datadd=data1;
                try{
                    const data= await Deploy.findOne({contract_Address:{$eq: includes.conadd}},'_id');
                    res.status(200).send([{"status code":"200",
                                            "status":"Ok",
                                            message:"Deployed Successfully",
                                            "data":{"contract_ID ":data._id}                                
                    }])
                    console.log(JSON.stringify(data._id))
                }catch(err){;console.log(err)}
            });
            
    });
}catch(err){
    console.log(err)
    res.status(err.status || 500).send({"status code":"500",
                                        "status":"Internal Server Error",
                                        message:"Failed to Deploy",
                                        "data":{"message":err.message,
                                        "details":err}                                
                                    });
}
}