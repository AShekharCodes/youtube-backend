const express = require("express");
const app = express();

// Your code goes here

app.get("/", (res) => {
  res.json("Hello!");
});

module.exports = app;
