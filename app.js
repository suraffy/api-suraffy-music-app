const express = require("express");
const music = require("./routers/musicRouter");

const app = express();

app.use(express.json());

app.use("/api/music", music);

module.exports = app;
