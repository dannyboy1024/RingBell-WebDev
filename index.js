const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const connectTestDB = require("./config/test_db");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const CORS_handeler = require("./middleware/CORS_handeler");
const path = require('path');

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
process.env.NODE_ENV === "development" ?
  connectTestDB() : connectDB();

// Route files
const listeners = require("./routers/listeners");
const users = require("./routers/users");
const devTools = require("./routers/dev");
const { propfind } = require("./routers/listeners");

const app = express();

// Get front end
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// CORS
app.use(CORS_handeler);
// Body parser
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Dev logging Middleware (only run in dev env)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/listeners", listeners);
app.use("/api/v1/users", users);
app.use("/api/v1/dev", devTools);
app.use("/", (req, res, next) => {
  //res.send("Welcome to RingBell API");
  //next();
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
})
