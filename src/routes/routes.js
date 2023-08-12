import express from "express";
import homeController from "../controllers/home.controller";

let router = express?.Router();

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
