const express = require("express");

const path = require("path");
const dataBase = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    res.json(dataBase);
  });

  app.post("/api/notes", (req, res) => {
    if (dataBase) {
      dataBase.push(req.body);
      res.json(true);
    }
  });
};
