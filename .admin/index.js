/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// const nodemailer = require('nodemailer');

const admin = require('firebase-admin');
var serviceAccount = require('./skupka-kirsanov-admin-3d3fcbfbcdf8.json');
const twilio = require('twilio');
const schedule = require('node-schedule');
const Promise = require('promise');
const escape = require('escape-html');
const express = require('express');
const app = express();
const serverStartTime = Math.floor(new Date() / 1);

const twilioAccountSid = 'ACe3fecd4580ba367a5c98523fbe734dc1';
const twilioAuthToken = '41aaa6e7e892f5c33a9c9fb2864270cf';
const client = new twilio(twilioAccountSid, twilioAuthToken);
// Configure the email transport using the default SMTP transport and a GMail account.
// See: https://nodemailer.com/
// For other types of transports (Amazon SES, Sendgrid...) see https://nodemailer.com/2-0-0-beta/setup-transporter/

// const mailTransport = nodemailer.createTransport('smtps://'+process.env.GMAIL_USERNAME+'%40gmail.com:'+process.env.GMAIL_PASSWORD+'@smtp.gmail.com');

// [START initialize]
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://skupka-kirsanov.firebaseio.com'
});
// [END initialize]

// Set our simple Express server to serve up our front-end files
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});
/**
 // Save the date at which we last tried to send a notification
 function updateNotification(uid, feedId){
    const update = {};
    update['/feeds/' + feedId + '/lastNotificationTimestamp'] =
        firebase.database.ServerValue.TIMESTAMP;
    update['/user-feeds/' + uid + '/' + feedId + '/lastNotificationTimestamp'] =
        firebase.database.ServerValue.TIMESTAMP;
    firebase.database().ref().update(update);
}

 /**
 * Send a new star notification email to the user with the given UID.
 */
// [START single_value_read]
/**
 function sendNotificationToUser(uid, feedId) {
    // Fetch the user's email.
    const userRef = firebase.database().ref('/users/' + uid);
    userRef.once('value').then(function(snapshot) {
        const email = snapshot.val().email;
        const feedRef = firebase.database().ref('/feeds/' + feedId);
        feedRef.once('value').then(function(thefeed) {
            if(!thefeed.val().lastNotificationTimestamp || thefeed.val().lastNotificationTimestamp>serverStartTime){ // Stop notifications for old stars
                // Send the email to the user.
                if (email) {
                    sendNotificationEmail(email).then(function() {
                        updateNotification(uid, feedId);
                    }, function(reason) { // Email send failure
                        console.log(reason); // Error
                    });
                }
            } else {
                updateNotification(uid, feedId);
            }
        });
    }).catch(function(error) {
        console.log('Failed to send notification to user:', error);
    });
}
 // [END single_value_read]


 /**
 * Send the new star notification email to the given email.
 */
/**
 function sendNotificationEmail(email) {
    const mailOptions = {
        from: '"Firebase Database Quickstart" <noreply@firebase.com>',
        to: email,
        subject: 'New star!',
        text: 'One of your feeds has received a new star!'
    };
    return mailTransport.sendMail(mailOptions).then(function() {
        console.log('New star email notification sent to: ' + email);
    });
}

 /**
 * Update the star count.
 */

// [START feed_stars_transaction]
/**
 function updateStarCount(feedRef) {
    feedRef.transaction(function(feed) {
        if (feed) {
            feed.starCount = feed.stars ? Object.keys(feed.stars).length : 0;
        }
        return feed;
    });
}
 // [END feed_stars_transaction]

 /**
 * Keep the likes count updated and send email notifications for new likes.
 */
function startListeners() {
    admin.database().ref('/feeds/').on('child_added', function (feedSnapshot) {
        // const feedReference = feedSnapshot.ref;
        // const feedId = feedSnapshot.key;
        const name = feedSnapshot.val().name;
        const email = feedSnapshot.val().email;
        const tel = feedSnapshot.val().tel;
        const time = feedSnapshot.val().time;

        return client.messages.create({
            to: '+7 921 444 7344',
            from: '+1 703 750 8706',
            body: `${name}, ${email}, ${tel}, ${time}`
        })
            .then(function (message) {
                console.log(message.sid);
                return client.message;
            })
            .catch((error) => console.error("ошибка sms", error));
        /**
         // Update the star count.
         // [START feed_value_event_listener]
         feedReference.child('stars').on('value', function(dataSnapshot) {
            updateStarCount(feedReference);
            // [START_EXCLUDE]
            updateStarCount(firebase.database().ref('user-feeds/' + uid + '/' + feedId));
            // [END_EXCLUDE]
        }, function(error) {
            console.log('Failed to add "value" listener at /feeds/' + feedId + '/stars node:', error);
        });
         // [END feed_value_event_listener]
         // Send email to author when a new star is received.
         // [START child_event_listener_recycler]
         feedReference.child('stars').on('child_added', function(dataSnapshot) {
            sendNotificationToUser(uid, feedId);
        }, function(error) {
            console.log('Failed to add "child_added" listener at /feeds/' + feedId + '/stars node:', error);
        });
         // [END child_event_listener_recycler]
         */
    });
    console.log('New star notifier started...');
    console.log('Likes count updater started...');
}

// Start the Firebase server
startListeners();

// Listen for HTTP requests
const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});