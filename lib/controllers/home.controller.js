"use strict";

var _dotenv = require("dotenv");
(0, _dotenv.config)();
var postWebhook = function postWebhook(req, res) {
  var body = req.body;
  console.log("\uD83D\uDFEA Received webhook:");
  console.dir(body, {
    depth: null
  });
  if (body.object === "page") {
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
    // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};
var getWebhook = function getWebhook(req, res) {
  var VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  var mode = req.query["hub.mode"];
  var token = req.query["hub.verify_token"];
  var challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

// function verifyRequestSignature(req, res, buf) {
//   var signature = req.headers["x-hub-signature-256"];

//   if (!signature) {
//     console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
//   } else {
//     var elements = signature.split("=");
//     var signatureHash = elements[1];
//     var expectedHash = crypto
//       .createHmac("sha256", config.appSecret)
//       .update(buf)
//       .digest("hex");
//     if (signatureHash != expectedHash) {
//       throw new Error("Couldn't validate the request signature.");
//     }
//   }
// }

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook
};