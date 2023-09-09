const express= require('express')

const app = express()
app.use(express.json())

app.listen(3000)

let users =[
    {
        'id':1,
        'name':'Sarang'
    },
    {
        'id':2,
        'name':'Ritesh'
    },
    {
        'id':1,
        'name':'Mayank'
    }
]


//GET
app.get('/user',(req,res)=>{
    console.log(req.query) //query
    res.send(users)  
})

//POST
app.post('/user',(req,res)=>{
    console.log(req.body) 
    users=req.body
    res.json({
        message:"data received successfully",
        user:req.body
    })
})

//UPDATE
app.patch('/user',(req,res)=>{
    console.log('req.body->',req.body)
    //update data in users obj
    let dataToBeUpdated=req.body
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key]
    }
    res.json({
        message:"data updated successfully"
    })
})

//DELETE
app.delete('/user',(req,res)=>{
    users={}
    res.json({
        message:"Data has been deleted"
    })
})

//PARAMETERS
app.get('/user/:username',(req,res)=>{
    console.log(req.params.username)
    console.log(req.params)
    res.send("Username recieved")
})