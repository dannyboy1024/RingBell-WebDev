class EmailConfirm {

    constructor(listener, bellRinger, time) {
        this.listener = listener;
        this.bellringer = bellRinger;
        this.time = time;
    }

    bellringerHTML = () => {
        const { listener, bellringer, time } = this;
        return (
            `<p><span style="font-weight: 400;"> Dear ${bellringer.name} </span></p>
            <p><span style="font-weight: 400;"> Hi！We have successfully paired you with listener ${listener.name}. </span></p>
            <p> </p>
            <p><strong> Your appointment  will be around ${time} </strong></p>
            <p> </p>
            <p><span style="color: #800000;"> <strong> The listener ${listener.name} will send you the zoom link by email  ${listener.email} </strong> 10 minutes to 1 hour before your appointment time. (Please be sure to check your email before the appointment!) </strong> </span></p>
            <p> </p>
            <p><span style="text-decoration: underline;"> <span style="font-weight: 400;"> If you need to cancel the appointment, please contact the listener through email as early as possible: contact.listener@gmail.com</span> </span></p>
            <p><span style="text-decoration: underline;"> <span style="font-weight: 400;"> If you do not attend the appointment within 25 minutes after the starting time,  your appointment will be automatically seen as canceled.</span> </span></p>
            <p> </p>
            <p><span style="font-weight: 400;"> This is a not-for-profit program，the listeners volunteer their time and effort to provide an open and inclusive listening space for their peers. Mutual respect is the basis of a good voluntary relationship. Please follow the appointment rules and ensure punctuality.</span></p>
            <p><span style="font-weight: 400;"> If the client logs in three times out of time or fails to get in touch with the listener during the agreed time, he/she will be added to the blacklist of ringers. Thank you for your understanding.</span></p>
            <p> </p>
            <p><strong> The following are the instructions for the service. Please read them carefully. Thank you: </strong></p>
            <ol>
            <li> <em><em><span>The clients shall respect the privacy of the listeners and shall not repeat，report or publicly release to any third party the personal information, experience and privacy mentioned by the listeners during the listening process.</span></em></em></li>
            <li><em><span style="font-weight: 400;">Please be polite and be careful with the language used during the listening process. If two warnings fail, the listener has the right to stop the listening immediately.</span> </em></li>
            <li><em><span style="font-weight: 400;">The Platform are not obliged to be responsible for the listener's behavior, speech, or any related extension of the listening process. After the appointment, the relationship between the attendees and the listeners is terminated, and the platform shall not assume any form of responsibility or obligation for the private or unilateral agreements between the listeners and the attendees.</span> </em></li>
            </ol>
            <p> </p>
            <p> </p>
            <p><span style="font-weight: 400;"> Have a nice day! </span></p>
            <p><span style="font-weight: 400;"> EmpowerChange </span></p>`
        );
    }

    listenerHTML = () => {
        const { listener, bellringer, time } = this;
        return (
            `<p><span style="font-weight: 400;">Dear ${listener.name}, you are successfully matched with our Client ${bellringer.name}</span></p>
            <p> </p>
            <p><strong>Your listening time duration is: ${time}</strong></p>
            <p><span style="color: #800000;"><strong>Please send your group QR code to the Client by email before the listening time starts, thank you. </strong></span></p>
            <p> </p>
            <p><span style="font-weight: 400;">If the listening session needs to be canceled because of any accident, please contact the alternative listener and report to the assistant immediately, thank you.</span></p>
            <p><span style="font-weight: 400;">If your Client did not show up in the group chat 25 minutes after the listening time starts, the online listening would be cancelled. If this happened, please send the Client’s information to the assistant, thank you. </span></p>
            <p> </p>
            <p><strong>The following are Client ${bellringer.name}’s basic information: ：</strong></p>
            <p> </p>
            <ul>
            <li><strong><strong>Name: ${bellringer.name}</strong></strong></li>
            </ul>
            <ul>
            <li><strong>Email: ${bellringer.email}</strong></li>
            </ul>
            <ul>
            <li><strong>University: ${bellringer.matchUni}</strong></li>
            </ul>
            <ul>
            <li><strong>Listening topic: ${bellringer.topic}</strong></li>
            </ul>
            <ul>
            <li><strong>Listening desire(s): ${bellringer.desire}</strong></li>
            </ul>
            <ul>
            <li><strong>Mental states: ${bellringer['mental status']}</strong></li>
            </ul>
            <ul>
            <li><strong>Other information: ${bellringer.other_info}</strong></li>
            </ul>
            <p> </p>
            <p><br /><br /></p>
            <p><span style="font-weight: 400;">Wish you have a great day!</span></p>
            <p><span style="font-weight: 400;">EmpowerCHANGE</span></p>`
        );
    }

    serviceMonitorHTML = () => {
        const { listener, bellringer, time } = this;
        return (
            `<p><span style="font-weight: 400;"> Hi, new matching has been created. </span></p>
            <p><span style="font-weight: 400;">  * Bellringer: ${bellringer.name}</span></p>
            <p><span style="font-weight: 400;">  * Listener: ${listener.name}</span></p>
            <p><span style="font-weight: 400;">  * Appointmemt time: ${time}</span></p>`
        );
    }
}

module.exports = EmailConfirm;
