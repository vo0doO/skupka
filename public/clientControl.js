"use strict";
$(function () {
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
            var postData = {
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
