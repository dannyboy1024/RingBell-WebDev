const User = require('../models/User');
const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errorResponse');
const ExpirationTime = 1000*60*60*24*3;


// ===================================== User =========================================

// @desc        Create user in datebase
// @route       POST /api/v1/users
// @access      Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = await User.findOne({email: req.body.email});
  res.status(201).json({
    success: true,
    data: token.token
  });
});

// @desc        Login user in datebase
// @route       POST /api/v1/users/login
// @access      Private
exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return next(new ErrorResponse(`User not found with email of ${req.body.email}`, 404));
  }
  const correntTime = new Date();
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch) {
      return next(new ErrorResponse(`Password incorrect with email of ${req.body.email}`, 401));
    }
  });
  var reToken = await User.findOne({email: req.body.email});
  var oldTime = new Date(reToken.updated);
  var i = 0;
  
  const timeoutLimit = 480
  while (correntTime.getTime() - oldTime.getTime() > 0 && i < timeoutLimit){
    reToken = await User.findOne({email: req.body.email});
    oldTime = new Date(reToken.updated);
    i++;
  }
  if (i < timeoutLimit) {
    res.status(200).json({success: true, data: reToken.token});
  } else {
    // return next(new ErrorResponse(`Request Timeout`, 408));
    return next(new ErrorResponse(`Request Timeout`, 413));
  }
});

// @desc        Get user info in datebase
// @route       GET /api/v1/users/login
// @access      Private
exports.getUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({token: req.query.token});
  if (!user) {
    return next(new ErrorResponse(`Wrong Token`, 404));
  }
  const correntTime = new Date();
  const oldTime = new Date(user.updated);
  if (correntTime.getTime() - oldTime.getTime() < ExpirationTime){
    res.status(200).json({success: true, data: user.info});
  } else {
    return next(new ErrorResponse(`Auth Token Expiration`, 401));
  }
});

// @desc        Update user info in datebase
// @route       POST /api/v1/users/update
// @access      Private
exports.updateUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({token: req.body.token});
  if (!user) {
    return next(new ErrorResponse(`Wrong Token`, 404));
  }
  const correntTime = new Date();
  const oldTime = new Date(user.updated);
  if (correntTime.getTime() - oldTime.getTime() < ExpirationTime){
    User.findOneAndUpdate({token: req.body.token}, {info: req.body.info}, {}, (err, success) => {
      if (success) {
        res.status(200).json({success: true, data: req.body.info});
      } else {
        return next(new ErrorResponse(`Unexpect Error`, 400));
      }
    });
  } else {
    return next(new ErrorResponse(`Auth Token Expiration`, 401));
  }
});