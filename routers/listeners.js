const express = require("express");

const {
  getListeners,
  getListener,
  getTimeslots,
  createListener,
  createListeners,
  updateListener,
  deleteListener,
  getMatchListener,
  confirmMatch,
  getTimeSlotsInWeek
} = require("../controllers/listeners");

const router = express.Router();

// ===================================== Get Match =========================================

router
  .route("/getMatch")
  .post(getMatchListener);

router
  .route("/confirmMatch")
  .post(confirmMatch);


// ===================================== Get Time Slots =========================================

router
  .route("/timeSlots")
  .get(getTimeslots);

router
  .route("/timeSlotsInWeek")
  .get(getTimeSlotsInWeek);

// ===================================== Basic CRUD =========================================

router
  .route("/bulk")
  .post(createListeners);

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
