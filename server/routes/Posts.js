const express = require('express');
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

const router=express.Router();

router.get('/',(req,res)=>{
    const sqlFetch="Select * from Posts;";
    db.query(sqlFetch,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        // res.json(result);
        res.send(result);
        
    })
    

})

router.post('/',(req,res)=>{

    const{title,postText,username}=req.body;
    const sqlInsert="Insert into Posts (title,postText,username) values (?,?,?);";
    db.query(sqlInsert,[title,postText,username],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        
    })
})

module.exports=router;