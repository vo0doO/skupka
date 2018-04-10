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
            updates['/feeds' + newFeedKey] = postData;

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
    tosUrl: 'https://xn----otbfcicqmv0g.xn--p1ai/'
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