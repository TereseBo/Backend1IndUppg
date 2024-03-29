const express=require('express');
const server=express();
const dotenv=require('dotenv').config();
const cors=require('cors');
const cookieparser=require('cookie-parser');

//pool
const {pool}=require('./database/pool');

// Routes
const registerRoute=require('./routes/registerRoute');
const friendRoute=require('./routes/friendRoute');
const contentRoute=require('./routes/contentRoute');
const loginRoute=require('./routes/loginRoute');

//server
server.use(cookieparser());
server.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
))
server.use(express.json());
server.use('/register',registerRoute);
server.use('/friends',friendRoute);
server.use('/content',contentRoute);
server.use('/login',loginRoute);

server.listen(process.env.port,()=>{
    console.log('Server is running');
});