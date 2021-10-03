const express = require("express");

const {
  getListeners,
  getListener,
  getMatchListener,
  createListener,
  updateListener,
  deleteListener,
  test
} = require("../controllers/listeners");

const router = express.Router();

router
    .route("/getMatch")
    .post(getMatchListener)
    .get(test);
    
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
