require("dotenv").config();

let postWebhook = (req, res) => {
  let body = req.body;

  if (body.object === "page") {
    body.entry.forEach((e) => {
      let webhook_event = e.messaging[0];
      console.log(webhook_event);
    });
    res.status(200).send("EVENT_SUCCESS");
  } else {
    res.sendStatus(404);
  }
};

let getWebhook = (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
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
  getWebhook: getWebhook,
};
