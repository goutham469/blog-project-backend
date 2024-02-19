const exp=require('express')
const countAPI=exp.Router()
let {ObjectId}=require("mongodb")

countAPI.use(exp.json())

countAPI.get('/getCount',async (req,res,next)=>{
    let countCollection=req.app.get("countCollection")
    let count = await countCollection.find().toArray()
    count=count[0].count_value
    
    res.send({message:"count fetched",payload:count})
})

countAPI.put('/modifyCount',async (req,res,next)=>{
    let countCollection=req.app.get("countCollection")

    let count = await countCollection.find().toArray()
    count=count[0].count_value

    console.log(count);
    count+=1

    await countCollection.updateOne({_id:new ObjectId("65c8650596a4ef99ede99cf7")},{$set:{count_value:count}})

    res.send({message:"count value modified",payload:count})
})


module.exports=countAPI;