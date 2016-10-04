requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery-3.1.1'
    }
});

requirejs(['jquery'], function( $ ) {
	console.log('Hello')
    console.log( $ )
});