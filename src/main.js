const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./configs/viewEngine.js");
const routes = require("./routes/routes.js");
require("dotenv").config();

const app = express();

// Set up body parser middleware before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
viewEngine(app);

// Config routes
routes(app);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log("🚀 Start at port: ", port, ". Node version: ", process.version);
});
