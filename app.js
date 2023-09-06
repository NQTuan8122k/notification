const { default: axios } = require("axios");
const Pusher = require("pusher");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());

const pusher = new Pusher({
  appId: "1663518",
  key: "c0089d0f975697ce31ba",
  secret: "7980e43373b353b732dd",
  cluster: "ap1",
  useTLS: true,
});

const PORT = 3030;

app.use(cors());

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.post("/notification", cors(), (request, response) => {
  const status = {
    Status: "Running",
  };
  console.log("request", request.body);

  if (request.body?.data) {
    pusher.trigger("my-channel", "my-event", request.body.data + "");
  }

  response.send(status);
});
