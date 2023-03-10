const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'Posts_app'
})

const router=express.Router();


router.post('/',(req,res)=>{

    const{id}=req.body;
    const sqlFetch="select * from Comments where Pid= ?";
    db.query(sqlFetch,[id],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        // console.log(id);
        res.send(result);

    })  
    
})
router.post('/new',(req,res)=>{

    const{commentBody,Pid,Username}=req.body;
    const sqlInsert="Insert into Comments (Pid,commentBody,Username) values (?,?,?);";
    db.query(sqlInsert,[Pid.id,commentBody,Username],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        
    })
    // console.log(commentBody);  
    // console.log(Pid);  
    // console.log(Username);  
    const sqlFetch="select * from Comments where Pid= ?";
    db.query(sqlFetch,[Pid.id],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        // console.log(id);
        res.send(result);

    })

    
})
module.exports=router;