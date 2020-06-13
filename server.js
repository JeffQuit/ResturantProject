// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const tables = require("./data/tableArr");
const waitlist = require("./data/waitlistArr");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./html/index.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "./html/reserve.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "./html/tables.html"));
});

// Create New Characters - takes in JSON input
app.post("/reserve", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  if (tables.length < 5) {
    tables.push(newTable);
  } else {
    waitlist.push(newTable);
  }
  //   tables.push(req.body);

  res.json(newTable);
});

app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
