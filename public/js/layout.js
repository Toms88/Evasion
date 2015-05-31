var socket;

tinyMCE.init({selector:'textarea'});

console.log(window.location.host);

if (!socket) 
	socket = io.connect('http://' + window.location.host);