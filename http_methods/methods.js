const express= require('express')

const app = express()
app.use(express.json())

app.listen(3000)

let users = {}

app.get('/user',(req,res)=>{
    res.send(users)  
})

app.post('/user',(req,res)=>{
    console.log(req.body) 
    users=req.body
    res.json({
        message:"data received successfully",
        user:req.body
    })
})

//Update

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

//delete
app.delete('/user',(req,res)=>{
    users={}
    res.json({
        message:"Data has been deleted"
    })
})