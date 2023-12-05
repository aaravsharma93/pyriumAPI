const storeData=require("../models/DBSchema");
exports.storeData = async(req, res) => {
    const user=new storeData.dstore({
        "contractAddress":req.body.contractAddress
        })
    await user.save();
    try{
        await storeData.dstore.findOne({contractAddress:{$eq: req.body.contractAddress}},'_id')
        .then((da)=>{
            console.log(da._id);
            res.status(200).send(da._id);
        }).catch((err)=>{
            console.log(err)
        });
    }catch(er){
        console.log(er);
        res.send(er)
    }   
}