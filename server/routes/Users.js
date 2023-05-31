const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt-updated");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "Posts_app",
});
const {sign} = require('jsonwebtoken');
const validateToken=require('../middlewares/AuthMiddleware');
const router = express.Router();
router.post("/registration", async (req, res) => {
  const  Username=req.body.username;
  const password=req.body.password;
//   console.log(req.body);
  let hashedPassword = await bcrypt.hash(password, 8);
  const sqlInsert = "Insert into Users (username,password) values (?,?);";
  db.query(sqlInsert, [Username, hashedPassword], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({status:1});

    // res.json("Working")
  });

  //   const sqlFetch = "select * from Comments where Pid= ?";
  //   db.query(sqlFetch, [Pid.id], (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     res.send(result);
  //   });
});
router.post("/login", async (req, res) => {
  const Username = req.body.Username;
  const password = req.body.Password;
  const sqlfetch="Select password,Uid from Users where username= ?;";
  db.query(sqlfetch, [Username], async (err, result) => {
    if (
      result.length === 0 ||
      !(await bcrypt.compare(password, result[0].password))
    ) {
      res.json({error:"Incorrect User name or password!!"});
    } else {
      // const id=results[0].id;
      const accessToken=sign({username:Username,id:result[0].Uid},"UseraccessToken")
      // console.log(result[0].Uid);
      // res.json(accessToken);

      // res.json({status:0});
      res.json({accessToken });
    }
  });

  
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.body);
});

module.exports = router;


