requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery-3.1.1'
    }
});

requirejs(['jquery'], function( $ ) {
	var $submit = $('#submit');
    $submit.on('click', printMessage);

    function printMessage(){
        var $chatLog = $('#chatLog');
        var $message = $('#message');
        $chatLog.append('<p>'+$message.val()+'</p>');
    }
});