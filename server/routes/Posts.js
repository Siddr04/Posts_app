const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Posts_app'
});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sqlFetch = 'SELECT * FROM Posts;';
    const result = await queryAsync(sqlFetch);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, postText, username } = req.body;
    const sqlInsert = 'INSERT INTO Posts (title, postText, username) VALUES (?, ?, ?);';
    await queryAsync(sqlInsert, [title, postText, username]);
    const sqlFetch = 'SELECT * FROM Posts;';
    const result = await queryAsync(sqlFetch);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
});

router.post('/post', async (req, res) => {
  try {
    const { id } = req.body;
    const sqlFetch = 'SELECT * FROM Posts WHERE id = ?;';
    const result = await queryAsync(sqlFetch, [id]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
});

// Helper function to promisify the db.query method
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = router;
