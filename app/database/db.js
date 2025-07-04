"use strict";
const mongoose = require("mongoose");
mongoose.set("debug", true);
const mongodbUrl = `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}?retryWrites=true`;
mongoose.connect(mongodbUrl, {});

mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("connected", () => {
  console.log("DATABASE CONNECTED");
});
db.on("error", (error) => {
  console.error("an error occured", JSON.stringify(error));
  console.log(
    error.message,
    new Error(error.message).stack,
    { mongodbUrl },
    true
  );
});
process.on("SIGINT", function () {
  db.close();
  console.log("DATABASE DISCONNSCTED");
  process.exit(1);
});

global.db = db;
