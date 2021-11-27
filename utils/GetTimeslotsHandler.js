class GetTimeslotsHandler {

    constructor(listeners) {
        this.listeners = listeners;
    }

    getTimeslotsInWeek = () => {
        const { listeners } = this;
        var availableTimeslots = [];

        // for each availability -> check id time is occupied -> if not, generage <Date, timeID>
        for (let cur_listener of listeners) {
            var cur_listener_timeslots = cur_listener
                .availability
                .map(seed => {
                    // get day after
                    var now = new Date();
                    var nowDay = now.getDay();
                    let seedDay = seed.day_in_week;
                    let seedHour = seed.hour;
                    let days_after_today = (seedDay > nowDay) ? (seedDay - nowDay) : (6 - nowDay + seedDay);
                    // create timeslot
                    let cur_timeslot = new Date(now.setDate(now.getDate() + days_after_today));
                    cur_timeslot.setHours(seedHour);
                    cur_timeslot.setMinutes(0);
                    cur_timeslot.setSeconds(0);
                    cur_timeslot.setUTCMilliseconds(0);
                    // get timeID
                    const current_day = cur_timeslot.getDay();
                    const current_hour = cur_timeslot.getHours();
                    return { date: cur_timeslot, timeID: (current_day * 24 + current_hour)};
                })
                .filter(cur_timeslot => {
                    // check if time is occupied
                    for (let occup of cur_listener.occupied_availability) {
                        if (occup.getTime() == cur_timeslot.date.getTime()) {
                            return false;
                        }
                    }
                    return true;
                });
            availableTimeslots.push(...cur_listener_timeslots);
        }

        // return [] of <Date, timeID
        return availableTimeslots;
    }

    getTimeslotsInMonth = () => {

    }

}

module.exports = GetTimeslotsHandler;