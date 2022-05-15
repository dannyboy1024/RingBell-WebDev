const Listener = require('../models/Listener');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const listeners_test_data_1 = require('../test-data/listeners_test_data_1.json');
const listeners_test_data_2 = require('../test-data/listeners_test_data_2.json');


// @desc        Reset test listeners
// @route       POST /api/v1/dev/reset-db-state
// @access      Private
exports.resetDbState = asyncHandler(async (req, res, next) => {
    const delete_result = await Listener.deleteMany({});
    const insert_result = await Listener.insertMany(listeners_test_data_1);
    res.status(200).json({ success: true, data: insert_result });
});

exports.setupDb = asyncHandler(async (req, res, next) => {
    const delete_result = await Listener.deleteMany({});
    const insert_result = await Listener.insertMany(req.body);
    res.status(200).json({ success: true, data: insert_result });
});