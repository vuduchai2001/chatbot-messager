import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import routes from "./routes/routes";
import { config } from "dotenv";

const app = express();

//config view engine
viewEngine(app);

//config routes
routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

config();

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log("🚀 Start at port: ", port, ". Node version: ", process.version);
});
