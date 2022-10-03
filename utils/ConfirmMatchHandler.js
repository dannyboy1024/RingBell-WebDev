const dotenv = require("dotenv");
const Listener = require('../models/Listener');
const { getNextAvailability, getDateDisplay } = require('./TimeTools');
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

const EmailConfirm = require("./EmailHandler");

// Load env vars
dotenv.config({ path: "../config/config.env" });

const ConfirmMatch = async (timeSlot, matchedListener, bellRinger, localTime) => {

    // Google API
    const { OAuth_CLIENT_ID, OAuth_CLIENT_SECRET, REDIRECT_URI, REFERSH_TOKEN } = process.env;

    const oAuth2Client = new google.auth.OAuth2(OAuth_CLIENT_ID, OAuth_CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFERSH_TOKEN })

    // --------------------- update DB, create email ---------------------
    const { SENDER_EMAIL, SENDER_EMAIL_PASSWORD } = process.env;

    // variables in email
    const listener = matchedListener;
    const listenerEmail = matchedListener.email;
    const bellringer = bellRinger;
    const bellringerEmail = bellRinger.email;
    const time = new Date(timeSlot);
    console.log("Confirm timeslot: " + localTime);

    // email for service reliability managers
    var serviceMonitorMaillist = [
        "yuto.dong@mail.utoronto.ca",
        "zhoux141@mcmaster.ca"
    ];

    // Modify availiability & queue
    matchedListener.occupied_availability.push(time);
    await Listener.findByIdAndDelete(matchedListener._id);
    await Listener.create(matchedListener);

    const emailConfirm = new EmailConfirm(listener, bellringer, localTime);

    // --------------------- send email ---------------------
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_EMAIL,
                clientId: OAuth_CLIENT_ID,
                clientSecret: OAuth_CLIENT_SECRET,
                refreshToken: REFERSH_TOKEN,
                accessToken: accessToken

            }
        })

        const listenerMailOptions = {
            from: 'EmpowerChange <' + SENDER_EMAIL + '>',
            to: listenerEmail,
            subject: "Confirmation for Listener Matching",
            Text: "Confirmation for Listener Matching",
            html: emailConfirm.listenerHTML()
        }

        const bellringerMailOptions = {
            from: 'EmpowerChange <' + SENDER_EMAIL + '>',
            to: bellringerEmail,
            subject: "Confirmation for Listener Matching",
            Text: "Confirmation for Listener Matching",
            html: emailConfirm.bellringerHTML()
        }

        const serviceMonitorMailOptions = {
            from: 'EmpowerChange <' + SENDER_EMAIL + '>',
            to: serviceMonitorMaillist,
            subject: "New Matching Created",
            Text: "Confirmation for Listener Matching",
            html: emailConfirm.serviceMonitorHTML()
        }

        const listenerResult = await transport.sendMail(listenerMailOptions);
        const bellringerResult = await transport.sendMail(bellringerMailOptions);
        const serviceMonitorResult = await transport.sendMail(serviceMonitorMailOptions);

        return ({ listenerResult, bellringerResult, serviceMonitorResult });
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = ConfirmMatch;