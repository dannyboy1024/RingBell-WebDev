
class ListenerMatcher {

    constructor(slots, listeners) {
        this.slots = [...slots];
        this.listeners = [...listeners];
    }

    getMatchedListener() {
        // get avaliable listeners
        const { slots } = this;
        var chosenSlot;
        var matchedListener = null;

        for (const listener of this.listeners){
            for (let slot of slots) {
                if (listener.availability.includes(slot)) {
                    chosenSlot = slot;
                    matchedListener = listener;
                    break;
                }
            }
            if (matchedListener){
                break;
            }
        }

        if (matchedListener) {
            // update availability
            const index = matchedListener.availability.indexOf(chosenSlot);
            matchedListener.availability.splice(index, 1);
            matchedListener.occupied_availability.push(chosenSlot);
            return matchedListener;
        } else {
            return 404;
        }
    }

}

module.exports = ListenerMatcher;