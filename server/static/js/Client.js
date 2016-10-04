define(function(require) {

    // Define a library of functions for performing client tasks
    var Client = {};

    Client.postMessage = function(dInput, successHandler) {
        var messageText = $(dInput).val();
        messageJson = JSON.stringify({
            'text': messageText
        });
        $.ajax({
            type: "POST",
            url: "/message",
            data: messageJson,
            success: successHandler,
            dataType: "json",
            contentType: "application/json"
        });
        $(dInput).val('');
    };

    Client.pollForMessages = function(successHandler) {
        $.ajax({
            type: "GET",
            url: "/messages",
            success: successHandler,
            dataType: "json",
            contentType: "application/json"
        });
    };
    
    return Object.seal(Client);
});