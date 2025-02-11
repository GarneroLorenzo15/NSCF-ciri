/* require("dotenv").config(); */
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const dbURL = `mysql://root:UzlhTrYSCPabmQMcBUMcOLzPRbQsSZTq@mysql.railway.internal:3306/railway`
// Configurazione del database
const db = mysql.createConnection(
  dbURL
  /* host: "localhost",
  user: "root", 
  password: "root", 
  database: "cirischema",  */);

// Connetti al database
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
  } else {
    console.log("Connesso al database MySQL");
  }
});

// API per salvare l'opinione
app.post("/saveOpinion", (req, res) => {
  const { textarea } = req.body;

  if (!textarea) {
    return res.status(400).json({ message: "Il campo textarea è obbligatorio" });
  }

  const query = "INSERT INTO saveopinion (textarea) VALUES (?)";
  db.query(query, [textarea], (err, result) => {
    if (err) {
      console.error("Errore nell'inserimento nel database:", err);
      return res.status(500).json({ message: "Errore del server" });
    }
    res.status(201).json({ message: "Opinione salvata con successo!", id: result.insertId });
  });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
