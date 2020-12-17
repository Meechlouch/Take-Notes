const fs = require("fs");
const dataBase = require("../db/db.json");
const data = "./db/db.json";

module.exports = function (app) {
  // Setup express app to listen to a 'GET' request on route /api/notes
  app.get("/api/notes", (req, res) => {
    fs.readFile(data, (err, resp) => {
      if (err) throw err;
      res.json(JSON.parse(resp));
    });
  });

  app.post("/api/notes/", (req, res) => {
    let savedData = fs.readFileSync(data, "utf8");
    savedData = JSON.parse(savedData);
    savedData.push(req.body);
    console.log(req.body);
    for (let i = 0; i < savedData.length; i++) {
      savedData[i].id = i;
    }

    savedData = JSON.stringify(savedData);
    fs.writeFileSync(data, savedData);
    res.json(JSON.parse(savedData));
  });

  app.delete("/api/notes/:id", (req, res) => {
    let savedData = fs.readFileSync(data, "utf8");
    console.log(savedData);
    savedData = JSON.parse(savedData);
    console.log(savedData);
    let idNum = parseInt(req.params.id);
    //oneNote = savedData.filter((savedData) => savedData.id === idNum);
    console.log(idNum);

    savedData.splice(idNum, 1);
    for (let i = 0; i < savedData.length; i++) {
      savedData[i].id = i;
    }
    console.log(savedData);
    savedData = JSON.stringify(savedData);
    console.log(savedData);
    fs.writeFileSync(data, savedData);
    res.send(JSON.parse(savedData));
  });
};
