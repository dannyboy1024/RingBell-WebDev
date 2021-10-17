const Listener = require('../models/Listener');

const AvailabilityUpdater = async (listeners) => {
    const now = new Date();
    const current_day = now.getDay();
    const current_hour = now.getHours();
    const current_timeID = current_day * 24 + current_hour;

    console.log("Current time ID: " + current_timeID);

    for (var listener of listeners) {
        var listener_needs_update = false;
        for (var timeID of listener.occupied_availability) {
            if (timeID < current_timeID) {
                listener_needs_update = true;
                const index = listener.occupied_availability.indexOf(timeID);
                listener.occupied_availability.splice(index, 1);
                listener.availability.push(timeID);
            }
        }
        if (listener_needs_update) {
            console.log("Updated availability for " + listener.name + ".");
            await Listener.findByIdAndUpdate(listener._id, listener, {
                new: true,
                runValidators: true
            })
        }
    }
    return listeners;
}

module.exports = AvailabilityUpdater;