// imports
const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors'); //to take cors issue
require('dotenv').config(); //to get all values in .env file 
const middlewares = require('./server/auth/middlewares.js');
const auth = require('./server/auth/index.js');//get the router
const mqtt = require('./server/mqtt/mqtt.js');//get the router mqtt

const app = express()

app.use(express.static("public"));
app.use(volleyball);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080'
  }));
  

// Connect to DB
const mongoose = require('mongoose');
mongoose.connect(process.env.mongoDB_native_driver,{                
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(()=>{console.log("Connected to DB ....");})
    .catch((e)=>{console.log(e);})



    
// Routes
const user_routes = require('./server/routing/user_routes');
app.use("/api/user",user_routes);

app.use(middlewares.checkTokenSetUser);
app.use('/auth' , auth);
app.use('/mqtt' , mqtt);



app.get("/",function(req,res){
  res.sendFile(__dirname + "/clientNew/public/pages/home/home.html");
});

app.get("/login",function(req,res){
  res.sendFile(__dirname + "/clientNew/public/pages/login/login.html");
});

app.get("/dashboard",function(req,res){
  res.sendFile(__dirname + "/clientNew/public/pages/dashboard/dashboard.html");
});

app.get('/check', (req, res) => {
    res.json({
    //   message : 'NEXNET 2021',
      user : req.user,
    });
});

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
  }
  
  function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
      stack: err.stack
    });
  }
  
  app.use(notFound);
  app.use(errorHandler);
  
  const port = process.env.PORT || 80;
  app.listen(port, () => {
    console.log('Listening on port', port);
  });


 