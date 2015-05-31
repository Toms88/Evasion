var socket;

tinyMCE.init({selector:'textarea'});

if (!socket) 
	socket = io.connect('http://' + window.location.host);