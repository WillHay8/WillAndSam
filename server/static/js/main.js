requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-3.1.1'
    }
});

requirejs(['jquery', 'Client'], function($, Client) {
    var receivedMessages = [];
	var $submit = $('#submit');
    $submit.on('click', function(e) {
        Client.postMessage($('#message'), successHandler);
    });
    $('#message').on('keypress', function(e) {
        if(e.which === 13){
            Client.postMessage(this, successHandler);
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

    setInterval(Client.pollForMessages(successHandler), 100);
});