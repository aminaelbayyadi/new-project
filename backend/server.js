const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express("");
app.use(express.json());
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

app.post("/", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO student (Name, Email) VALUES ( ?, ?)";
  db.query(sql, [name, email], (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Student added successfully", data });
  });
});

app.delete("/student/:id",(req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id =req.params.id ;

  db.query(sql,[id], (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "Student deleted successfully", data });
  });
});

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

