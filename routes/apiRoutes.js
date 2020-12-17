// Require access to the NodeJs file system module to modify our files
const fs = require("fs");
// path saved in variable
const data = "./db/db.json";

module.exports = function (app) {
  // Setup express app to listen for a 'GET' request on route /api/notes
  app.get("/api/notes", (req, res) => {
    // fs reads a file at data path location, then a callback function with two arguments is executed
    fs.readFile(data, (err, resp) => {
      // err is thrown if something goes wrong
      if (err) throw err;
      // Data is sent if all is well
      res.json(JSON.parse(resp));
    });
  });

  // Setup express app to listen for a 'POST' request on route /api/notes
  app.post("/api/notes/", (req, res) => {
    let savedData = fs.readFileSync(data, "utf8");
    savedData = JSON.parse(savedData);
    savedData.push(req.body);
    console.log(req.body);

    for (let i = 0; i < savedData.length; i++) {
      savedData[i].id = i + 1;
    }

    console.log(savedData);
    savedData = JSON.stringify(savedData);
    fs.writeFileSync(data, savedData);
    res.json(JSON.parse(savedData));
  });

  app.delete("/api/notes/:id", (req, res) => {
    let savedData = fs.readFileSync(data, "utf8");
    console.log(savedData);
    savedData = JSON.parse(savedData);

    let idNum = parseInt(req.params.id);
    //oneNote = savedData.filter((savedData) => savedData.id === idNum);
    console.log(idNum);

    savedData.splice(idNum - 1, 1);
    for (let i = 0; i < savedData.length; i++) {
      savedData[i].id = i + 1;
    }
    console.log(savedData);
    savedData = JSON.stringify(savedData);
    fs.writeFileSync(data, savedData);
    res.send(JSON.parse(savedData));
  });
};
