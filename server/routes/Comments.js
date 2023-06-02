const express = require('express');
const cors = require('cors');

const mysql = require('mysql');
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'Posts_app'
})
const validateToken=require('../middlewares/AuthMiddleware');
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
router.post('/new',validateToken,(req,res)=>{

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

router.delete("/:postID/:commentID",validateToken,async(req,res)=>{
    const commentID=req.params.commentID;
    const Pid=req.params.postID;
    // console.log(Pid);
    // console.log(commentID);


    const sqlDelete="delete from Comments where Cid=?";
    db.query(sqlDelete,[commentID],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send({message:"Comment Deleted!"});
        }
    })
    
})
module.exports=router;