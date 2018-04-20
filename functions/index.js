'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

exports.sendEmailConfirmation = functions.database.ref("/feeds/{key}").onWrite((change) => {
    const snapshot = change.data.current;
    const val = snapshot.val();
    // const feed = firebase.database.ref('/feeds/').orderByChild("time").limitToLast(1);
    const mainOptions = {
        from: '"СКУПКА КИРСАНОВ" <danilakirsanovspb@gmail.com>',
        to: 'exenoobe@gmail.com',
        subject: "У ВАС НОВАЯ ЗАЯВКА !!! СКУПКА КИРСАНОВ",
        text: JSON.stringify(val),
        html: `<p>${val.name}</p><p>${val.email}</p><p>${val.tel}</p><p>${val.time}</p>`
    };

    return mailTransport.sendMail(mainOptions)
        .then(() => console.log("Новое сообщение отправленно"))
        .catch((error) => console.error("Ошибка при отправке сообщения ", error))
});
