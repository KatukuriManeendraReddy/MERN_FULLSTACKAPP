var myexpress=require('express');
var myaxios=require('axios');
const myServer=myexpress();
const port=4000;
myServer.listen(port,()=>{
    console.log("welcome");
});
myServer.get("/",(req,res)=>{
    res.send("<body bgcolor='lightblue'><h1>welcome!!</h1></body>");
});
myServer.get("/contact",(req,res)=>{
    res.sendFile(__dirname+'/views/contact.html');
});
let options={
    "headers":{
        "x-apikey":"657c537763ede90d96f17207",
    }
}
myServer.get('/requsers',(req,res)=>{
    myaxios.get("https://healthtracker-06c0.restdb.io/rest/cctusers",options)
    .then(response=>{
        res.send(response.data)
    })
    .catch(error=>{
        res.send(error.message);
    })
});
myServer.get("*",(req,res)=>{
    res.redirect("/contact");
});