const express=require('express');
const server=express();
const dotenv=require('dotenv').config();
//pool
const {pool}=require('./database/pool');

// Routes
const registerRoute=require('./routes/registerRoute');
const friendRoute=require('./routes/friendRoute');
const contentRoute=require('./routes/contentRoute');
const loginRoute=require('./routes/loginRoute');

server.use(express.json());
//server.use(express.urlencoded({extended:true}));
server.use('/register',registerRoute);
server.use('/friends',friendRoute);
server.use('/content',contentRoute);
server.use('/login',loginRoute);




server.get('/',(req,res)=>{
    pool.execute('SELECT * FROM users ', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(results);
    })
});


server.listen(process.env.port,()=>{
    console.log('Server is running');
});