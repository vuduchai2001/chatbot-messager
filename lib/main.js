"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./configs/viewEngine"));
var _routes = _interopRequireDefault(require("./routes/routes"));
var _dotenv = require("dotenv");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

//config view engine
(0, _viewEngine["default"])(app);

//config routes
(0, _routes["default"])(app);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _dotenv.config)();
var port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log("🚀 Start at port: ", port, ". Node version: ", process.version);
});