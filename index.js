const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const { body, validationResult } = require("express-validator");

const app = express();
const port = 3000;

app.use(bodyParser.json());


const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)");
  db.run("CREATE TABLE dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)");
});

app.post('/cats', [body("name").notEmpty().withMessage("O nome é obrigatório")], (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const name = req.body.name;
  db.run(`INSERT INTO cats (name, votes) VALUES ('${name}', 0)`, function(err) {
    if (err) {
      res.status(500).send("Erro ao inserir no banco de dados");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
});

app.post('/dogs', [body("name").notEmpty().withMessage("O nome é obrigatório")], (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const name = req.body.name;
    db.run(`INSERT INTO dogs (name, votes) VALUES ('${name}', 0)`, function (err) {
        if (err) {
          res.status(500).send("Erro ao inserir no banco de dados");
        } else {
          res.status(201).json({ id: this.lastID, name, votes: 0 });
        }
      });
});

app.post('/vote/:animalType/:id', (req, res) => {
  const { animalType, id } = req.params;
  if (animalType !== "cats" && animalType !== "dogs") {
    return res.status(400).send("Tipo de animal inválido"
  )};
  const query = `SELECT * FROM ${animalType} WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else if (!row) {
      res.status(404).send("Animal não encontrado");
    }else {
      db.run(`UPDATE ${animalType} SET votes = votes + 1 WHERE id = ${id}`, function (err) {
        if (err) {
          res.status(500).send("Erro ao atualizar os votos");
        } else {
          res.status(200).send("Voto computado");
        }
      });
    }
  });
});

app.get('/cats', (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.get('/dogs', (req, res) => {
  db.all("SELECT * FROM dogs", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro!');
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});