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
    const sql ="SELECT * FROM task";
    db.query(sql,(err,data) => {
  if(err) return res.json("Error");
  console.log(data);
  return res.json(data);
    })
})

app.put("/task/:id", (req, res) => {
  const { completed } = req.body;
  const sql = "UPDATE task SET completed = ? WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [completed, id], (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "task updated successfully", data });
  });
});

app.post("/", (req, res) => {
  const { name, completed } = req.body;
  const sql = "INSERT INTO task (Name, completed) VALUES (?, ?)";
  db.query(sql,[name, completed], (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "task added successfully", data });
  });
});

app.delete("/task/:id",(req, res) => {
  const sql = "DELETE FROM task WHERE ID = ?";
  const id =req.params.id ;

  db.query(sql,[id], (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "task deleted successfully", data });
  });
});

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
