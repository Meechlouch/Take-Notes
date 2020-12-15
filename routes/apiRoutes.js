const fs = require("fs");
//const path = require("path");
const dataBase = require("../db/db.json");
const data = "./db/db.json";
module.exports = function (app) {
  // Setup express app to listen to a 'GET' request on route /api/notes
  app.get("/api/notes", (req, res) => {
    return res.json(dataBase);
  });

  app.post("/api/notes", (req, res) => {
    let savedData = fs.readFileSync(data, "utf8");
    //console.log(savedData);
    savedData = JSON.parse(savedData);
    //console.log(savedData);
    req.body.id = savedData.length;
    savedData.push(req.body);
    //console.log(savedData);
    savedData = JSON.stringify(savedData);
    fs.writeFileSync(data, savedData);
    console.log(savedData);
  });
};
