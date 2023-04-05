//node pg docs: https://node-postgres.com/
//pg express docs: https://expressjs.com/en/guide/database-integration.html#postgresql
//express docs: https://devdocs.io/express/
//pg docs: https://www.postgresql.org/docs/
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });

pool.connect();

//start requests here dummy
app.get("/", (req, res) => {
  res.send("Welcome to the Pet Shop");
});

app.get("/pets", (req, res) => {
  pool.query(`SELECT * FROM pet`).then((result) => {
    console.log(result.rows);
    res.send(result.rows);
  });
});

app.get("/pets/:id", (req, res) => {
  pool.query(`SELECT * FROM pet WHERE id = ${req.params.id}`).then((result) => {
    console.log(result.rows);
    res.send(result.rows);
  });
});

//this doesnt work in the request.http
app.post("/pets", (req, res) => {
  let petAge = Number(req.body.age);
  let petKind = req.body.kind;
  let petName = req.body.name;
  pool
    .query(
      `INSERT INTO pet (age, kind, name) VALUES (${petAge}, '${petKind}', '${petName}')`
    )
    .then((result) => {
      res.send(result.rows);
    });
});

app.patch("/pets/:id", (req, res) => {
  let petAge = Number(req.body.age);
  let petKind = req.body.kind;
  let petName = req.body.name;
  if (petName && petKind && !isNaN(petAge)) {
    pool
      .query(
        `UPDATE pet SET age = ${petAge}, kind = '${petKind}', name = '${petName}' WHERE id = ${req.params.id}`
      )
      .then((result) => {
        res.send(result.rows);
      });
  } else {
    res.statusCode = 400;
    res.setHeader("Conetent-Type", "application/json");
    res.send("Bad Request");
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
