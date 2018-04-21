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
    let snapshot = change.data.current;
    let val = snapshot.val();
    let mainOptions = {
        from: '"СКУПКА КИРСАНОВ" <danilakirsanovspb@gmail.com>',
        to: 'exenoobe@gmail.com',
        subject: "У ВАС НОВАЯ ЗАЯВКА !!! СКУПКА КИРСАНОВ",
        text: JSON.stringify(val),
        html: `<p>${val.name}</p><p>${val.email}</p><p>${val.tel}</p><p>${val.time}</p>`
    };

    return mailTransport.sendMail(mainOptions)
        .then(() => console.log("E-mail уведомление отправленно"))
        .catch((error) => console.error("Ошибка при отправке e-mail уведомления", error))
});

/**
 *  <!-- СТАРТ -- [ФУНКЦИЯ ОТПРАВКИ СМС УВЕДОМЛЕНИЯ О НОВОМ ЛИДЕ]
 *
 var twilio = require("twilio");
 var accountSid = 'ACe3fecd4580ba367a5c98523fbe734dc1';
 var authToken = '41aaa6e7e892f5c33a9c9fb2864270cf';
 var client = new twilio(accountSid, authToken);
exports.sendSmsNotification = functions.database.ref('/feeds/{key}').onWrite((ch) => {
    let snap = ch.data.current;
    let shot = snap.val();

    return client.messages.create({
        to: '+79214447344',
        from: '+79214447344',
        body: `${shot.name}, ${shot.email}, ${shot.tel}, ${shot.time}`
    })
        .then((message) => {
            console.log(message.sid);
            return client.sendMessage(message)
        })
        .catch((error) => console.error("ошибка sms", error))
});
 *
 * [ФУНКЦИЯ ОТПРАВКИ СМС УВЕДОМЛЕНИЯ О НОВОМ ЛИДЕ] -- КОНЕЦ  -->
 */