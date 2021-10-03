const express = require("express");

const {
  getListeners,
  getListener,
  getMatchedListener,
  createListener,
  updateListener,
  deleteListener,
} = require("../controllers/listeners");

const router = express.Router();

router
  .route("/")
  .get(getListeners)
  .post(createListener);

router
  .route("/:id")
  .get(getListener)
  .put(updateListener)
  .delete(deleteListener);

router
  .route("/getMatch")
  .post(getMatchedListener);

module.exports = router;
