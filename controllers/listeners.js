const ErrorResponse = require('../utils/errorResponse');
const ListenerMatcher = require('../utils/ListenerMatcher');
const Listener = require('../models/Listener');
const asyncHandler = require('../middleware/async');

// @desc        Get all listeners
// @route       GET /api/v1/listeners
// @access      Public
exports.getListeners = asyncHandler(async (req, res, next) => {
  const listeners = await Listener.find(req.query);
  res.status(200).json({ success: true, count: listeners.length, data: listeners });
});

// @desc        Get single listener
// @route       GET /api/v1/listeners/:id
// @access      Public
exports.getListener = asyncHandler(async (req, res, next) => {
  const listener = await Listener.findById(req.params.id);
  if (!listener) {
    return next(new ErrorResponse(`Listener not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: listener });
});

// @desc        Get matched listener
// @route       POST /api/v1/listeners
// @access      Private
exports.getMatchListener = asyncHandler(async (req, res, next) => {
  // const listeners = await Listener.create(req.body);
  const timeSlots = req.body;
  const listeners = await Listener.find(req.query);
  const listenerMatcher = new ListenerMatcher(timeSlots.body, listeners);

  // queue (may be better to put in a seprate "confirm selection" request)
  const matchedListener = JSON.parse(JSON.stringify(listenerMatcher.getMatchedListener()));

  if (matchedListener == 404) {
    return next(new ErrorResponse(`No listener is avaliable at given time slots`, 404));
  } else {
    // const matchedListener = JSON.parse(JSON.stringify(listenerMatcher.getMatchedListener()));
    // await Listener.findByIdAndDelete(matchedListener._id);
    // await Listener.create(matchedListener);
    res.status(200).json({
      success: true,
      data: matchedListener
    });
  }

});

// @desc        TEST
// @route       POST /api/v1/listeners
// @access      Private
// exports.selectListener = asyncHandler(async (req, res, next) => {
//   const listeners = await Listener.find(req.query);
//   res.status(200).json({ success: true, count: listeners.length, data: listeners });
// });


// @desc        Create new listener
// @route       POST /api/v1/listeners
// @access      Private
exports.createListener = asyncHandler(async (req, res, next) => {
  const listener = await Listener.create(req.body);
  res.status(201).json({
    success: true,
    data: listener
  });
});

// @desc        Update listener
// @route       PUT /api/v1/listeners/:id
// @access      Private
exports.updateListener = asyncHandler(async (req, res, next) => {
  const listener = await Listener.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!listener) {
    res.status(400).json({ success: false, msg: "Invalid Listener id." });
  }
  res.status(200).json({ success: true, data: listener });
});

// @desc        Delete listener
// @route       DELETE /api/v1/listeners/:id
// @access      Private
exports.deleteListener = asyncHandler(async (req, res, next) => {
  const listener = await Listener.findByIdAndDelete(req.params.id);
  if (!listener) {
    res.status(400).json({ success: false, msg: "Invalid Listener id." });
  }
  res.status(200).json({ success: true, data: listener });
});

