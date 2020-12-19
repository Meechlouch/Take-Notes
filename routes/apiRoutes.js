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
    // fs reads a file at data path location, then saves data to variable
    let savedData = fs.readFileSync(data, "utf8");
    // Data recieved is parsed to a json object
    savedData = JSON.parse(savedData);
    // Data is then pushed to the body of the 'POST' request
    savedData.push(req.body);
    // for loop adds an id to every index of our array
    for (let i = 0; i < savedData.length; i++) {
      savedData[i].id = i + 1;
    }
    // The modified array is then stringified before being written to file
    savedData = JSON.stringify(savedData);
    // The modified array is then written back to file
    fs.writeFileSync(data, savedData);
    // Modified data is then sent to client as a JSON object
    res.json(JSON.parse(savedData));
  });

  // Setup app to listen for 'delete' request on route api/notes/ with a param id.
  app.delete("/api/notes/:id", (req, res) => {
    // fs reads a file at data path location, then saves data to variable
    let savedData = fs.readFileSync(data, "utf8");
    // The data is then parsed from a string to a JSON object
    savedData = JSON.parse(savedData);
    // Our param.id is parsed from a string to a number and saved to variable
    let idNum = parseInt(req.params.id);
    console.log(idNum);
    // delete from array
    savedData.splice(idNum - 1, 1);
    console.log(savedData);
    // reset id at every index
    for (let i = 0; i < savedData.length; i++) {
      savedData[i].id = i + 1;
    }
    // The modified array is then stringified before being written to file
    savedData = JSON.stringify(savedData);
    // The modified array is then written back to file
    fs.writeFileSync(data, savedData);
    // Modified data is then sent to client as a JSON object
    res.send(JSON.parse(savedData));
  });
};
