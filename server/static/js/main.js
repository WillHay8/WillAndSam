requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-3.1.1'
    }
});

requirejs(['jquery', 'Client'], function($, Client) {

    // Local state
    var receivedMessages = [];

    // Functions
    function updateChatLog(messageText) {
        $('#chatLog').append('<p>'+messageText+'</p>');
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

    // Event handlers
    $('#submit').on('click', function(e) {
        Client.postMessage($('#message'), successHandler);
    });
    $('#message').on('keypress', function(e) {
        if(e.which === 13){
            Client.postMessage(this, successHandler);
        }
    });
    // bind successHandler to pollForMessages, so that its first argument is the success handler
    setInterval(Client.pollForMessages.bind(null, successHandler), 100);
});