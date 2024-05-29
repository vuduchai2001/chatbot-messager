require("dotenv").config();
const request = require("request");

const postWebhook = (req, res) => {
  let body = req.body;

  if (body.object === "page") {
    body.entry.forEach((e) => {
      let webhook_event = e.messaging[0];
      console.log(webhook_event);

      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      }
      // else if (webhook_event.postback) {
      //   handlePostback(sender_psid, webhook_event.postback);
      // }
    });
    res.status(200).send("EVENT_SUCCESS");
  } else {
    res.sendStatus(404);
  }
};

const getWebhook = (req, res) => {
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

const handleMessage = async (sender_psid, received_message) => {
  let messageText = received_message.text?.toLowerCase().replace(/\s+/g, "");
  let response = { text: "Hải dương 34 chào anh em" };

  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log("yourInput--", messageText);
  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  callSendAPI(sender_psid, response);
  res.status(200).send("MESSAGE SENDED");
};

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  console.log("RESPONSE-", request_body);
  let infoRes = {
    uri: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: "POST",
    json: request_body,
  };

  // Send the HTTP request to the Messenger Platform
  request(infoRes, (err, res, body) => {
    if (!err) {
      console.log("message sent!");
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook,
};
