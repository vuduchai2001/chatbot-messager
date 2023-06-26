import express from "express";

//config view engine
const configViewEngine = (app) => {
  app.use(express.static("./src/pulic"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
