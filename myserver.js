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
    headers:{
        "x-apikey":"657c537763ede90d96f17207",
    }
}
myServer.get('/requsers',(req,res)=>{
    myaxios.get("https://healthtracker-06c0.restdb.io/rest/cctusers",options)
    .then(response=>{
        res.send(response.data);
    })
    .catch(error=>{
        res.send(error.message);
    })
});
myServer.get('/newadminpage',(req,res)=>{
    res.sendFile(__dirname+'/views/newadminpage.html');

})
myServer.get('/addnewuser',(req,res)=>{
    res.sendFile(__dirname+'/views/addnewuser.html')
})

myServer.post('/newuser', function(req,res){
    console.log("entered newuser");

    const userObj = {
        "username":"mani",
        "email":"mani@cct.com",
        "mobile":"9876543210",
        "password":"mani@cct",
        "confirmPassword":"mani@cct"
    }

    var config = {
        method: 'post',
        url: 'https://healthtracker-06c0.restdb.io/rest/cctusers',
        headers: { 
          'x-apikey': '657c537763ede90d96f17207', 
          'Content-Type': 'application/json'
        },
        data : userObj
      };
      
      myaxios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(JSON.stringify(response.data))
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
        res.send(err.toString());
      });
  

})

myServer.get("*",(req,res)=>{
    res.redirect("/");
});