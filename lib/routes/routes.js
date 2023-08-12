"use strict";

var _express = _interopRequireDefault(require("express"));
var _home = _interopRequireDefault(require("../controllers/home.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"] === null || _express["default"] === void 0 ? void 0 : _express["default"].Router();
var initRoutes = function initRoutes(app) {
  router.get("/", function (req, res) {
    return res.send("Hello world!");
  });

  //webhooks
  router.get("/webhook", _home["default"].getWebhook);
  router.post("/webhook", _home["default"].postWebhook);
  return app.use("/", router);
};
module.exports = initRoutes;