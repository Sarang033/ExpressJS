const express = require("express")

const app = express()

app.get("/",function(req,res){
    res.sendFile('./files/app.html',{root:__dirname})
})

app.get("/about", function(req,res){
    res.sendFile('./files/about.html',{root:__dirname})
    // res.sendFile("file location")    // to send a file 
})

app.listen(3000)

//Redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about')
})

//404 Page
app.use((req,res)=>{
    res.status(404).sendFile('/files/404.html',{root:__dirname})
})