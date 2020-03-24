"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const consign = require("consign");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./app/public"));

consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;