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


app.listen(3024,()=>{
    console.log("Server started on port 3024");
})

