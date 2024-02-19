const exp=require("express")
const cors=require("cors")
const usersAPI = require("./APIs/usersAPI")
const postsAPI = require("./APIs/postsAPI")
const countAPI = require("./APIs/countAPI")
const app=exp()
const mclient=require("mongodb").MongoClient

app.use(exp.json())
app.use(cors())

// import path module to use build folder to create MERN application
const path=require("path")

app.use(exp.static(path.join(__dirname,'./build')))

require("dotenv").config()


// setting up connection with mongoDB ATLAS

let DBurl=process.env.DATABASE_CONNECTION_URL;

    mclient.connect(DBurl)
    .then((client)=>{
        let dataBase=client.db("blog")
        let userCollection=dataBase.collection("users") 
        let postsCollection=dataBase.collection("posts")
        let countCollection=dataBase.collection("count")

        app.set("userCollection",userCollection)
        app.set("postsCollection",postsCollection)
        app.set("countCollection",countCollection)

    })
    .catch(err=>{console.log("error at connecting to database")})


// checking request type and sending to specific API
app.use('/users',usersAPI)
app.use('/posts',postsAPI)
app.use('/count',countAPI)

// handling or dealing with page Refreshments

app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
})

// handling invalid paths
app.use((req,res,next)=>{
    res.send({message:`invalid path url ${req.url}`})
})



let port_number=process.env.PORT;

app.listen(port_number,()=>console.log(`server running on port :  ${port_number}...`))