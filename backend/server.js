const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express("");

app.use(cors ());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    port: 3306,
    database:"crud"
})

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id', db.threadId);
});
app.get("/", (req,res) => {
    const sql ="SELECT * FROM student";
    db.query(sql,(err,data) => {
  if(err) return res.json("Error");
  return res.json(data);
    })
})

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

