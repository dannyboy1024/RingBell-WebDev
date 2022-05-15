const express = require("express");

const {
  resetDbState,
  setupDb
} = require("../dev_tools/dbTools");

const router = express.Router();

// ===================================== Dev Tools =========================================

router
  .route("/reset-db-state")
  .post(resetDbState);

router
  .route("/setupDB")
  .post(setupDb);

module.exports = router;
