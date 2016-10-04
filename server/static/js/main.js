requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery-3.1.1'
    }
});

requirejs(['jquery'], function( $ ) {
    var receivedMessages = [];
	var $submit = $('#submit');
    $submit.on('click', postMessage);

    $('#message').on('keypress', function(e) {
        if(e.which === 13){
            postMessage(this);
        }
    });

    function updateChatLog(messageText) {
        var $chatLog = $('#chatLog');
        $chatLog.append('<p>'+messageText+'</p>');
    }

    function successHandler(allMessages) {
        var lastOldMessageId = 0;
        if (receivedMessages.length > 0) {
            lastOldMessageId = receivedMessages[receivedMessages.length - 1].id;
        }
        newMessages = allMessages.filter(function(m) {return m.id > lastOldMessageId;});
        newMessages.forEach(function(m){
            updateChatLog(m.text);
        });
        receivedMessages = allMessages;
    }

    function postMessage(dInput) {
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
    }

    function pollForMessages() {
        $.ajax({
            type: "GET",
            url: "/messages",
            success: successHandler,
            dataType: "json",
            contentType: "application/json"
        });
    }

    setInterval(pollForMessages, 100);
});