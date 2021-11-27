const express = require("express");

const {
  resetDbState
} = require("../dev_tools/dbTools");

const router = express.Router();

// ===================================== Dev Tools =========================================

router
  .route("/reset-db-state")
  .post(resetDbState);


module.exports = router;
