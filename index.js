import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router/indexRouter.js';
dotenv.config({path:'app.env'})
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));


app.use(express.json());
app.use('/api', router)
mongoose.connect(process.env.MongoDB_URI)
    .then(() => {
    console.log("MongoDB Connected...🚀");
    }).catch(err => {
    console.log(err);
})
const port = 3000;
app.listen(port, () => {
    try {
        console.log(`server is Running in ${port}`);
    } catch (error) {
        console.log("error",error);
    }});