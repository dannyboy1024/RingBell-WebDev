const dotenv = require("dotenv");
const Listener = require('../models/Listener');
const { getNextAvailability, getDateDisplay } = require('./TimeTools');
const nodemailer = require("nodemailer");

const EmailConfirm = require("./EmailHandler");


const ConfirmMatch = async (timeSlot, matchedListener, bellRinger, localTime) => {
    // Load env vars
    dotenv.config({ path: "../config/config.env" });

    // variables
    const listenerName = matchedListener.name;
    const listenerEmail = matchedListener.email;
    const bellringerName = bellRinger.name;
    const bellringerEmail = bellRinger.email;
    const time = new Date(timeSlot);
    // const displayedTime = getDateDisplay(time);
    const displayedTime = localTime;
    console.log("Confirm timeslot: "+ displayedTime);

    // Modify availiability & queue
    matchedListener.occupied_availability.push(time);
    await Listener.findByIdAndDelete(matchedListener._id);
    await Listener.create(matchedListener);

    // create sender
    let transport = {
        // service: 'smtp.gmail.com',
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: true,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.TEST_EMAIL,
            pass: process.env.TEST_EMAIL_PASSWORD
        }
    };
    var transporter = nodemailer.createTransport(transport);


    // create email
    const emailConfirm = new EmailConfirm(listenerName, listenerEmail, bellRinger, displayedTime);

    let listenerMsg = {
        from: '"Ringbell"<noreply@ringbell.com>', // sender address
        to: listenerEmail, // list of receivers
        subject: "Confirmation for Listener Matching", // Subject line
        text: "hello",
        html: emailConfirm.listenerHTML()
    }

    let bellringerMsg = {
        from: '"Ringbell"<noreply@ringbell.com>', // sender address
        to: bellringerEmail, // list of receivers
        subject: "Confirmation for Listener Matching", // Subject line
        text: "hello",
        html: emailConfirm.bellringerHTML()
    }

    // send
    transporter.sendMail(listenerMsg, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("-> Email successfully sent to listener!");
    });

    transporter.sendMail(bellringerMsg, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("-> Email successfully sent to bellringer!");
    });

}


module.exports = ConfirmMatch;