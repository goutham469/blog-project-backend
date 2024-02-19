const exp=require("express")
const usersAPI=exp.Router()

usersAPI.use(exp.json())

// setting POST requests

usersAPI.post('/createUser',async (req,res,next)=>{
    let newUser=req.body
    console.log(newUser)

    let userCollection=req.app.get("userCollection")

    await userCollection.insertOne(newUser);

    res.send({message:"new user registered"})
})
usersAPI.get('/getUsers',async (req,res,next)=>{

    let userCollection=req.app.get("userCollection")

    let user_name_from_website=req.query.user_name;

    console.log(req.query.user_name)
    let result;

    if(user_name_from_website==undefined)
    {result = await userCollection.find().toArray()}
    else
    {result = await userCollection.find({user_name:user_name_from_website}).toArray()}


    res.send({message:"all users data",payload:result})
})

// usersAPI.get(`/getUsers/?user_name=${userName}`,(req,res,next)=>{
//     let user_name_from_website=req.params.userName;
//     console.log(userName)

//     res.send({message:"user found"})
// })

module.exports=usersAPI;