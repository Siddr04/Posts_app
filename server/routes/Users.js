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
  const sqlfetch="Select password from Users where username= ?;";
  db.query(sqlfetch, [Username], async (err, result) => {
    if (
      result.length === 0 ||
      !(await bcrypt.compare(password, result[0].password))
    ) {
      res.json("Incorrect password or Username");
    } else {
      // const id=results[0].id;
      res.json("Success");
    }
  });

  
});
module.exports = router;
