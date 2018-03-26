$(function () {
    $.get('/dreams', function (dreams) {
        dreams.forEach(function (dream) {
            $('<li></li>').text(dream).appendTo('ul#section1');
        });
    });

    $('#register').submit(function (event) {
        event.preventDefault();
        var data = {
            "cookie": this.cookie,
            "time": event.timeStamp,
            "name": this.name.value,
            "email": this.email.value,
            "tel": this.tel.value,
            "CI": window.clientInformation
        };
        this.name.value = "";
        this.email.value = "";
        this.tel.value = "";

        var dataJSON = JSON.stringify(data);
        var usJSON = JSON.parse(dataJSON);

        /*$.post(`/dreams/${dataJSON}`, function() {
            $('input').focus();
    }, "application/x-www-form-urlencoded");*/
    });
});
