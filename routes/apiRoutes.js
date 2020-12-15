const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const dataBase = require("../db/db.json");

module.exports = function (app) {
  // Setup express app to listen to a 'GET' request on route /api/notes
  app.get("/api/notes", function (req, res) {
    res.json(dataBase);
  });
};
