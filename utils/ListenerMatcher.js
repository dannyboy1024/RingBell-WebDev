class ListenerMatcher {

    constructor(slots, listeners) {
        this.slots = [...slots];
        this.listeners = [...listeners];
    }

    getMatchedListener() {
        // get avaliable listeners
        const { slots } = this;
        var chosenSlot = null;
        var matchedListener = null;

        for (const listener of this.listeners){
            for (let slot of slots) {
                for (let availability of listener.availability){
                    console.log(availability);
                    if (availability.timeID == slot){
                        chosenSlot = slot;
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
            console.log(matchedResult);
            return matchedResult;
        } else {
            return 404;
        }
    }

}

module.exports = ListenerMatcher;