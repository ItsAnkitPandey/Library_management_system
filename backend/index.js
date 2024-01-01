import express from "express";
import mongoose from "mongoose";
import userAuth from './routes/auth/userAuth.js';
import adminAuth from './routes/auth/adminAuth.js';
import bookRoute from './routes/books/bookRoute.js';
import transactionRoute from './routes/transactionRoutes.js'
import cors from 'cors';
import {MongoDbUrl} from './config.js'

const PORT = 8080;

const app = express();
app.use(express.json()); //middleware for parshing request body
app.use(cors());

app.get('/', (req,res)=> {
    console.log(req);
    return res.status(234).send('Backend is running');
})

app.use('/user', userAuth);
app.use('/admin', adminAuth);
app.use('/book', bookRoute );
app.use('/', transactionRoute)

mongoose.connect(MongoDbUrl)
        .then(()=>{
            console.log('App is connected to database.');
            app.listen(PORT, ()=> {
                console.log(`app is listening on port no. ${PORT}`);
            });
        })
        .catch((error)=>{
            console.log(error);
        })