"use strict";

$(() => {
    $("#register").submit(function (event) {
        event.preventDefault();
        var name = this.name.value;
        var email = this.email.value;
        var tel = this.tel.value;
        var time = new Date();
        var CI = this.clientInformation;

        this.name.value = "";
        this.email.value = "";
        this.tel.value = "";

        function writeNewFeed(name, email, tel, time) {
            var postData;
            postData = {
                name: name,
                email: email,
                tel: tel,
                time: time,
            };

            var newFeedKey = firebase.database().ref().child('feeds').push().key;

            var updates = {};
            updates['/feeds/' + newFeedKey] = postData;

            return firebase.database().ref().update(updates);
        }

        writeNewFeed(name, email, tel, time, CI);

        time = "";
        CI = ""
    });
});

var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

$(() => {
    $("#cl").on('click', () => {
        $("#firebaseui-auth-container").toggle();
    });
});

const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BPKtgXIa_cM_4nzEJMaGoJNk3ufQnlzI1GvceXVpbnQqKpCDMCjpxgrS7h2S5pvZuLZZwfSU1n-w77RaMJduilo");

messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
}).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
});

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function (currentToken) {
    if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
    }
}).catch(function (err) {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
});


// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // ...
    }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});