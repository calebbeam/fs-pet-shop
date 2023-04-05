const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.port || 8000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Pet Shop");
});

app.get("/pets", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, data) => {
    let pets = JSON.parse(data);
    res.send(pets);
  });
});

app.get("/pets/:id", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, data) => {
    let pets = JSON.parse(data);
    res.send(pets[req.params.id]);
  });
});

app.post("/pets", (req, res) => {
  let newPet = {
    age: req.body.age,
    kind: req.body.kind,
    name: req.body.name,
  };
  fs.readFile("pets.json", "utf-8", function readPets(error, data) {
    let pets = JSON.parse(data);
    pets.push(newPet);
    let jsonAddedPets = JSON.stringify(pets);
    fs.writeFileSync("pets.json", jsonAddedPets, "utf-8");
    res.send(newPet);
  });
});

app.patch("/pets/:id", (req, res) => {
  let petAge = Number(req.body.age);
  let petKind = req.body.kind;
  let petName = req.body.name;
  if (petName && petKind && !isNaN(petAge)) {
    fs.readFile("pets.json", "utf-8", function readPets(error, data) {
      let pets = JSON.parse(data);
      let updatedPet = pets[req.params.id];
      updatedPet.age = petAge;
      updatedPet.kind = petKind;
      updatedPet.name = petName;
      console.log(updatedPet);
      let jsonAddedPets = JSON.stringify(pets);
      fs.writeFileSync("pets.json", jsonAddedPets, "utf-8");
      res.send(updatedPet);
    });
  } else {
    res.statusCode = 400;
    res.setHeader("Conetent-Type", "application/json");
    res.send("Bad Request");
  }
});

app.delete("/pets/:id", (req, res) => {
  fs.readFile("pets.json", "utf-8", function readPets(error, data) {
    let pets = JSON.parse(data);
    let destroyedPets = pets.splice(req.params.id, 1);
    let jsonDestroyedPets = JSON.stringify(pets);
    fs.writeFileSync("pets.json", jsonDestroyedPets, "utf-8");
    res.send(jsonDestroyedPets);
  });
});

app.listen(port, () => {
  console.log(`server listening on port:${port}`);
});
