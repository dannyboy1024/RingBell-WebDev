const express = require("express");

const {
  createUser,
  loginUser,
  getUserInfo,
  updateUserInfo
} = require("../controllers/users");

const router = express.Router();

// ===================================== User registration =========================================

router
  .route("/")
  .post(createUser);

// ===================================== User login =========================================

router
  .route("/login")
  .post(loginUser)
  .get(getUserInfo);

// ===================================== Update User =========================================

router
  .route("/update")
  .post(updateUserInfo);

module.exports = router;