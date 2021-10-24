const Listener = require('../models/Listener');
const TimeTools = require('./TimeTools');
const { getCurrentTimeID, isPassedOccupancy, getNextAvailability } = require('./TimeTools');

const AvailabilityUpdater = async (listeners) => {
    for (let listener of listeners) {
        var listener_needs_update = false;
        for (let timeSlot of listener.occupied_availability) {
            if (isPassedOccupancy(timeSlot)) {
                listener_needs_update = true;
                const index = listener.occupied_availability.indexOf(timeSlot);
                listener.occupied_availability.splice(index, 1);
                getNextAvailability(timeSlot);
                listener.availability.push(getNextAvailability(timeSlot));
            }
        }
        if (listener_needs_update) {
            console.log("-> Updated availability for " + listener.name + ".");
            await Listener.findByIdAndUpdate(listener._id, listener, {
                new: true,
                runValidators: true
            })
        }
    }

    return listeners;
}

module.exports = AvailabilityUpdater;