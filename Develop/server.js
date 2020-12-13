const express = require("express");
const app = express();
const path = require("path");

//Setup routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
