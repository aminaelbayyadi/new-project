const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express("");

app.use(cors ());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req,res) => {
    const sql ="SELECT * FROM student";
    db.query(sql,(err,data) => {
  if(err) return res.json("Error");
  return res.json("data");
    })
})

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

