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

//Mini App

const userRouter=express.Router();
// Base router, Router to use
app.use('/user',userRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

//GET
// app.get('/user',(req,res)=>{
//     console.log(req.query) //query
//     res.send(users)  
// })

//POST
// app.post('/user',(req,res)=>{
//     console.log(req.body) 
//     users=req.body
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     })
// })

//UPDATE
// app.patch('/user',(req,res)=>{
//     console.log('req.body->',req.body)
//     //update data in users obj
//     let dataToBeUpdated=req.body
//     for(key in dataToBeUpdated){
//         users[key]=dataToBeUpdated[key]
//     }
//     res.json({
//         message:"data updated successfully"
//     })
// })

//DELETE
// app.delete('/user',(req,res)=>{
//     users={}
//     res.json({
//         message:"Data has been deleted"
//     })
// })

//PARAMETERS
// app.get('/user/:username',(req,res)=>{
//     console.log(req.params.username)
//     console.log(req.params)
//     res.send("Username recieved")
// })

//MOUNTING In Express -> commented the get method

function getUser(req,res){
    res.send(users)
}

function postUser(req,res){
    console.log(req.body) 
    users=req.body
    res.json({
        message:"data received successfully",
        user:req.body
    })
}

function updateUser(req,res){
    console.log('req.body->',req.body)
    //update data in users obj
    let dataToBeUpdated=req.body
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key]
    }
    res.json({
        message:"data updated successfully"
    })
}

function deleteUser(req,res){
    users={}
    res.json({
        message:"Data has been deleted"
    })
}

 function getUserById(req,res){
    console.log(req.params.id)
    let paramId=req.params.id
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i]
        }
    }
    res.json({
        message:"req recieved",
        data:obj
    })
 }