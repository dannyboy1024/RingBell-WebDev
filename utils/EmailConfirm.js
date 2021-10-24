class EmailConfirm {

    constructor(listenerName, listenerEmail, bellringerName, bellringeremail) {
        this.listenerName = listenerName;
        this.listenerEmail = listenerEmail;
        this.bellringerName = bellringerName;
        this.bellringeremail = bellringeremail;
    }

    listenerHTML = () => {
        return (
            `<h3>Hello ${this.listenerName}</h3>
            <p>You have been matched with bell-ringer <b>${this.bellringerName}</b>!</p>`
        );
    }

    bellringerHTML = () => {
        return (
            `<h3>Hello ${this.bellringerName}</h3>
            <p>You have been matched with listener <b>${this.listenerName}</b>!`
        );
    }
}

module.exports = EmailConfirm;
