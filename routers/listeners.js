const express = require("express");

const {
  getListeners,
  getListener,
  getTimeslots,
  createListener,
  updateListener,
  deleteListener,
  getMatchListener,
  confirmMatch
} = require("../controllers/listeners");

const router = express.Router();

router
  .route("/getMatch")
  .post(getMatchListener);

router
  .route("/confirmMatch")
  .post(confirmMatch);

router
  .route("/timeSlots")
  .get(getTimeslots);

router
  .route("/")
  .get(getListeners)
  .post(createListener);

router
  .route("/:id")
  .get(getListener)
  .put(updateListener)
  .delete(deleteListener);


module.exports = router;
