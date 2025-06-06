const express=require("express");
const path=require("path");
const fs=require("fs");
const users=require("./database.json");
const jwt=require("jsonwebtoken");
var database;
var token;
const app=express();
const port=3600;
app.use(express.json());
app.get('/',(req,res)=>{
      res.sendFile(__dirname+'/index.html');
});
app.get('/welcome',(req,res)=>{
      res.sendFile(__dirname+'/welcome.html');
});
app.get('/login',(req,res)=>{
      res.sendFile(__dirname+'/login.html');
});
app.get('/signup',(req,res)=>{
      res.sendFile(__dirname+'/signup.html');
});
//Signup route
app.post("/register",(req,res)=>{
      const name=req.body.name;
      const password=req.body.password;
      const work=req.body.work;
      let isPresent=false;
      let isPresentIndex=null;
      fs.readFile("database.json",function(err,data){
            if(err) throw err;
            database=JSON.parse(data);
            for(let i=0;i<database.length;i++){
                  if(database[i].name===name&&database[i].password===password){
                        isPresent=true;
                        isPresentIndex=i;
                        break;
                  }
            }
            if(isPresent){
                  res.json({
                        signup:false,
                        token:null,
                        error:"already Registered",
                  });
            }
            else{
                  let user={
                  name:name,
                  password:password,
                  work:work,
                  token:token
                  };
                  users.push(user)
                  fs.writeFile(
                        "database.json",JSON.stringify(users),
                        err=>{
                              if(err) throw err;
                              res.json({
                                    signup:true,
                                    token:"generated",
                                    data:"Successfully Registered",
                              });
                              console.log("Done writing");
                        });
            }
      });
});
//Login route
app.post("/auth",(req,res)=>{
      const name=req.body.name;
      console.log(name);
      const password=req.body.password;
      console.log(password);
      let isPresent=false;
      let isPresentIndex=null;
      fs.readFile("database.json",function(err,data){
            if(err) throw err;
            database=JSON.parse(data);
            for(let i=0;i<database.length;i++){
                  if(database[i].name===name && database[i].password===password){
                        isPresent=true;
                        isPresentIndex=i;
                        break;
                  }
            }
            if(isPresent){
                  const token=jwt.sign(database[isPresentIndex],"secret");
                  res.json({
                        login:true,
                        token:token,
                        data:database[isPresentIndex]
                  });
            }
            else{
                  res.json({
                        login:false,
                        error:"Please Check Name And Password",
                  });
            }
      });
});
//verifyToken
app.post('/verifyToken',(req,res)=>{
      const token=req.body.token;
      if(token){
            const decode=jwt.verify(token,"secret");
            res.json({
                  login:true,
                  data:decode,
            });
      }
      else{
            res.json({
                  login:false,
                  data:"error"
            });
      }
});
app.post("/welcome",(req,res)=>{
      res.redirect("/welcome")
});
app.post("/login",(req,res)=>{
      res.redirect("/login")
});
app.post("/signup",(req,res)=>{
      res.redirect("/signup")
});
app.listen(port,()=>{
      console.log(`server is running at http://localhost:${port}/`)
});