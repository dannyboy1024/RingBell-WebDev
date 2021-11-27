class ListenerMatcher {

    constructor(choices, listeners) {
        this.choices = [...choices];
        this.listeners = [...listeners];
    }

    getMatchedListener() {
        // get avaliable listeners
        const { choices,listeners } = this;
        console.log(choices);
        var chosenSlot = null;
        var matchedListener = null;

        for (const listener of listeners){
            for (let choice of choices) {
                choice = new Date(choice.date);
                for (let seed of listener.availability){
                    let seedDay = seed.day_in_week;
                    let seedHour = seed.hour;
                    let choiceDay = choice.getDay();
                    let choiceHours = choice.getHours();

                    if (seedDay == choiceDay && seedHour == choiceHours){
                        chosenSlot = choice;
                        matchedListener = listener;
                        break;
                    }
                }
                if (matchedListener) break;
            }
            if (matchedListener) break;
        }

        if (matchedListener) {
            const matchedResult = {listener: matchedListener, timeSlot: chosenSlot}
            return matchedResult;
        } else {
            return 404;
        }
    }

}

module.exports = ListenerMatcher;