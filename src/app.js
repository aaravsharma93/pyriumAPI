const express=require("express");
const app=express();
require("./db/conn");
const Deploy=require("./models/DBSchema");
const port=  process.env.PORT || 3002;

app.use(express.json());
var cors = require('cors');
app.use(cors());


const contract = require("./controllers/deployContract");
const contract2=require("./controllers/createAccount");
const deposit=require("./controllers/depositAmt");
const checkbalance=require("./controllers/checkBalance");
const withdraw=require("./controllers/withdrawBalance")
const send=require("./controllers/sendMoney");
const gasfees=require("./controllers/gasFees");
const log=require("./controllers/logout");
const storage= require('./controllers/store')
// const two=require("./controllers/new")
const test=require("../testing/create")

app.get("/",(req,res)=>{
    res.send("welcome to pyrium)"); 
})
// Deploy Contract
app.post("/deploy_contract", contract.deployContract);

//create Account
app.post("/create",contract2.Create);

//deposite amount
app.post("/deposit", deposit.Deposit);
//10000000000000000000
//check Balance
app.post("/checkBalance",checkbalance.CheckBalance);

//withdraw Amount// var val="10000000000000000000";
app.post("/withdraw",withdraw.WithDraw);

//send amount to startup
app.post("/sendAmt",send.sendAmount)

//calculate the estimated gas fees of smart contract functions
app.post("/gasFees",gasfees.GasFee)

//logout
app.get("/logout",log.Logout)

app.post("/store",storage.storeData)

app.get("/create/status",(req,res)=>{
    res.send("account has ben created...:)"); 
})
app.get("/test",test.testing);

app.get("/fetch",(req,res)=>{
    Deploy.find({},(err,res1)=>{
        if(err){
            console.log(err)
            res.send(err);
        }else{
            res.send({res1});
            console.log(res1)
        }
    })
})
app.listen(port ,()=>{
    console.log(`connection is setup at ${port}`);
})