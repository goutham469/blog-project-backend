const exp=require("express")
const postsAPI=exp.Router();

postsAPI.use(exp.json())

postsAPI.post('/newPost',async (req,res,next)=>{
    let postsCollection=req.app.get("postsCollection")

    let newPost=req.body
    console.log(newPost)

    await postsCollection.insertOne(newPost);

    res.send({message:"new post created successfully"})
})

postsAPI.get('/getPosts',async (req,res,next)=>{
    let postsCollection=req.app.get("postsCollection")

    let result = await postsCollection.find().toArray()

    res.send({message:"all users collected",payload:result})
})

let {ObjectId} = require('mongodb')
postsAPI.put('/updateViews',async (req,res,next)=>{
    let post_id=req.query._id;
    console.log(post_id);
    let postsCollection=req.app.get("postsCollection")

    let currentViews=await postsCollection.find({_id:new ObjectId(post_id)},{views:true,_id:false,body:false,author:false}).toArray()
    currentViews=Number(currentViews[0].views)
    console.log("current views : ",currentViews)
    currentViews+=1;
    postsCollection.updateOne({_id:new ObjectId(post_id)},{$set:{views:currentViews}},(res)=>{
        res.send({message:"post received"})
    })
    
})


module.exports=postsAPI;