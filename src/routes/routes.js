const express = require("express");
const homeController = require("../controllers/home.controller.js");

let router = express.Router();

let initRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hello world!");
  });

  //webhooks
  router.get("/webhook", homeController.getWebhook);
  router.post("/webhook", homeController.postWebhook);

  return app.use("/", router);
};

module.exports = initRoutes;
