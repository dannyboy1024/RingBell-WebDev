const express = require("express");

const {
  getListeners,
  getListener,
  createListener,
  updateListener,
  deleteListener,
} = require("../controllers/listeners");

const router = express.Router();

router.route("/").get(getListeners).post(createListener);

router
  .route("/:id")
  .get(getListener)
  .put(updateListener)
  .delete(deleteListener);

module.exports = router;
