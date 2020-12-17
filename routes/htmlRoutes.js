const express = require("express");

// Require 'path' module to get file path for our html
const path = require("path");

// Export module to be accessed
module.exports = function (app) {
  // Setup middleware to serve our CSS and JavaScript static files
  app.use(express.static(path.join(__dirname, "../public")));

  //Setup routes
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
