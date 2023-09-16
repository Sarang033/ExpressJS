const mongoose=require("mongoose")
const express= require('express')
const emailValidator = require("email-validator")
const app = express()
app.use(express.json())

app.listen(3000)

// let users =[
//     {
//         'id':1,
//         'name':'Sarang'
//     },
//     {
//         'id':2,
//         'name':'Ritesh'
//     },
//     {
//         'id':1,
//         'name':'Mayank'
//     }
// ]

//Mini App

const userRouter=express.Router();

const authRouter=express.Router();

// Base router, Router to use
app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

authRouter
.route('/signup')
.get(middleware,getSignUp)
.post(postSignUp)

//MiddleWare
function middleware(req,res,next){
    console.log("Middleware encountered")
    next();
}
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

async function getUsers(req,res){
    let allUsers= await userModel.find()
    res.json({
        massage:'List of all users',
        data:allUsers
    })
}

function postUser(req,res){
    console.log(req.body) 
    users=req.body
    res.json({
        message:"data received successfully",
        user:req.body
    })
}

async function updateUser(req,res){
    console.log('req.body->',req.body)
    //update data in users obj
    let dataToBeUpdated=req.body
    let user= await userModel.findOneAndUpdate({email:'rohan@gamil.com'},dataToBeUpdated);
    // for(key in dataToBeUpdated){
    //     users[key]=dataToBeUpdated[key]
    // }
    res.json({
        message:"data updated successfully",
        data:user
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

 // AUTH -> SIGNUP FORM

 function getSignUp(req,res,next){
    res.sendFile('/index.html',{root:__dirname});
 }


async function postSignUp(req,res){
    let dataObj = req.body;
     let user=await userModel.create(dataObj)
    // console.log('backend',user)
    res.json({
        message:"User Signed Up",
        data:user
    })
}


//Connecting Mongoose
const db_link="mongodb+srv://sarangchamp2004:Sarangmongo33@cluster0.efpck6j.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then(function(db){
    console.log("db connected")
})
.catch(function(err){
    console.log(err)
});

//Creating User Schema
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    confirmPassword:{
        type:String,
        required:true,
        min:8,
        validate:function(){
            return this.confirmPassword==this.password
        }
    },
})

// PRE AND POST HOOKS

// userSchema.pre('save',function(){
//     console.log('before saving in db',this)
// })

// userSchema.post('save',function(doc){
//     console.log('after saving in db',doc)
// })

//Dont store confirmPassword into database using hooks
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})



//Model

const userModel=mongoose.model('userModel',userSchema);



// (async function createUser(){
//     let user={
//         name:'Rohan',
//         email:'rohan@gmail.com',
//         password:"tarri2001",
//         confirmPassword:"tarri2001"
//     }
//     let data= await userModel.create(user)
//     console.log(data)
// })();