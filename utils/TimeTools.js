exports.getCurrentTimeID = () => {
    const now = new Date();
    const current_day = now.getDay();
    const current_hour = now.getHours();
    return current_day * 24 + current_hour;
}

exports.isPassedOccupancy = (occupancy) => {
    const now = new Date();
    const { time } = occupancy;
    if (time < now) {
        return true;
    }
    return false;
}

exports.getNextAvailability = (timeSlot) => {
    const {timeID} = timeSlot;
    const nextDate = time.setDate(time.getDate() + 7);

    // const now = new Date();
    // const nextDate = new Date(2021, 10, (now.getDate()+(timeID/24)), (timeID%24), 0, 0, 0);
    return {timeID: timeID, time: nextDate};
}

exports.getTimeslotsFromListeners = (listeners) => {
    var timeSlots = [];
    var timeIDs = [];
    for (const listener of listeners){
        for (const timeSlot of listener.availability){
            if (!timeIDs.includes(timeSlot.timeID)){
                timeIDs.push(timeSlot.timeID);
                timeSlots.push(timeSlot);
            }
        }
    }
    return timeSlots;
}