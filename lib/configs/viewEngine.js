"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//config view engine
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]("./src/pulic"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};
module.exports = configViewEngine;