class ListenerMatcher {

    constructor(slots, listeners) {
        this.slots = [...slots];
        this.listeners = [...listeners];
    }

    getAvailibileListeners () {
        const {slots} = this;
        const avaliableListeners = this.listeners.filter(listener => {
            for (let slot of slots) {
                if (listener.availability.includes(slot)) return true;
            }
            return false;
        });
        return avaliableListeners;
    }

    getMatchedListeners (){
        const avaliableListeners = this.getAvailibileListeners();
        
        return avaliableListeners[0];
    }

}

module.exports = ListenerMatcher;