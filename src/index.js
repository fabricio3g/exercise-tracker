const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");
const app = express();

// app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const userRoute = require("../routes/userRoute.js");
const exerciseRoute = require("../routes/exerciseRoute.js");
mongoose.connect(
  process.env.MONGOURI,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected");
});

app.use(express.static("public"));

app.post("/api/users/:_id/exercises", exerciseRoute);

app.use("/", userRoute);

app.listen(3000);
