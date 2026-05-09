//Import express module
require("dotenv").config();
const express = require("express");
//create an instance of the express application
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const corsOptions = require("./config/corsOptions.js");
const connectDB = require("./config/dbConfig.js");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

connectDB();

//Built in middlerware functions
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/data", express.static(path.join(__dirname, "data")));
app.use(express.json());

//Custom middlerware function
app.use(logger);

//Cross-origin resource sharing
app.use(cors(corsOptions));

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/user/:userID/book/:bookID", (req, res) => {
  const { userID, bookID } = req.params;
  res.send(`user ID: ${userID}, book ID: ${bookID}`);
});

app.get("/user/{:id}", (req, res) => {
  const userId = req.params.id || "No ID Provided";
  res.send(`User ID: ${userId}`);
});

app.get("/old-page", (req, res) => {
  res.redirect(301, "/new-page");
});

app.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get(
  "/multi",
  (req, res, next) => {
    console.log("first Handler executed");
    req.data = "Data from first handler";
    next();
  },
  (req, res, next) => {
    console.log("second Handler executed");
    req.data = "Data from second handler";
    next();
  },
  (req, res) => {
    console.log("third Handler executed");
    res.send(`final response ${req.data}`);
  },
);

//Intentional error test route-------------
app.get("/error-test", (req, res, next) => {
  next(new Error("This is a test error"));
});
//------------------------------------------

app.use("/students", require("./routes/api/student.js"));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

//Custom error middleware function
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
