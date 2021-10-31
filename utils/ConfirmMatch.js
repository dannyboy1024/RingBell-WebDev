const dotenv = require("dotenv");
const Listener = require('../models/Listener');
const TimeTools = require('./TimeTools');
const nodemailer = require("nodemailer");

const EmailConfirm = require("./EmailConfirm");


const ConfirmMatch = async (timeSlot, matchedListener, bellRinger) => {
    // Load env vars
    dotenv.config({ path: "../config/config.env" });

    // variables
    const listenerName = matchedListener.name;
    const listenerEmail = matchedListener.email;
    const bellringerName = bellRinger.name;
    const bellringerEmail = bellRinger.email;

    // Modify availiability (uncomment after testing!)
    let index = matchedListener.availability.indexOf(timeSlot);
    const nextTimeSlot = getNextAvailability(timeSlot);
    matchedListener.availability.splice(index, 1);
    matchedListener.occupied_availability.push(nextTimeSlot);

    // queue
    await Listener.findByIdAndDelete(matchedListener._id);
    await Listener.create(matchedListener);

    // create sender
    let transport = {
        // service: 'smtp.gmail.com',
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
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
    const emailConfirm = new EmailConfirm(listenerName, listenerEmail, bellringerName, bellringerEmail);

    let listenerMsg = {
        from: '"Ringbell"<noreply@ringbell.com>', // sender address
        to: listenerEmail, // list of receivers
        subject: "Confirmation for Listener Matching", // Subject line
        text: "hello",
        html: emailConfirm.listenerHTML()
    }

    let bellringerMsg = {
        from: '"Ringbell"<noreply@ringbell.com>', // sender address
        to: listenerEmail, // list of receivers
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