const mongoose=require("mongoose");
const validator=require("validator");
const deploySchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3
    },
    address:{
        type:String,
        required:true,
        minlength:40
    },
    contract_Address:{
        type:String,
        required:true,
        minlength:40,
        unique:true
    },
    private_key:{
        type:String,
        required:true
    }
});
const amountSchema=new mongoose.Schema({
    startupWallet:{
        type:String,
        required:true,
        minlength:40 
    },
    pyriumWallet:{
        type:String,
        required:true,
        minlength:40 
    },
    amount:{
        type:Number,
        required:true
    },
    contract_Address:{
        type:String,
        // required:true,
        minlength:40
    }
})
const dataSchema=new mongoose.Schema({
    contractAddress:{
        type:String,
        // required:true,
        // minlength:40,
        // unique:true
    }
})
//create a new collection 
const Deploy=new mongoose.model('DeployContract',deploySchema);
const sendAmt=new mongoose.model('SendAmt',amountSchema);
const storeData=new mongoose.model('StoreData',dataSchema);
module.exports=Deploy;
module.exports.sd=sendAmt;
module.exports.dstore=storeData;