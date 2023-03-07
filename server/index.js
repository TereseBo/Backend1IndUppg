const express=require('express');
const server=express();
const dotenv=require('dotenv').config();

// Routes
const registerRoute=require('./routes/registerRoute');
const friendRoute=require('./routes/friendRoute');
const contentRoute=require('./routes/contentRoute');
const loginRoute=require('./routes/loginRoute');

server.use('/register',registerRoute);
server.use('/friends',friendRoute);
server.use('/content',contentRoute);
server.use('/login',loginRoute);

server.get('/',(req,res)=>{
    res.send('Hello World');
});

server.listen(process.env.port,()=>{
    console.log('Server is running');
});