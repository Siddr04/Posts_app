const express=require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express();
const mysql = require('mysql');
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'Posts_app'
})


app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
//applying router as a middleware
const postRouter=require('./routes/Posts');
const commentsRouter=require('./routes/Comments');

app.use("/",postRouter);
app.use("/comments",commentsRouter);

app.listen(3024,()=>{
    console.log("Server started on port 3024");
})

