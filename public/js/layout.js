var socket;

tinyMCE.init({selector:'textarea'});

console.log(window.location.host);

if (!socket) 
	socket = io.connect('http://127.0.0.1:8080');