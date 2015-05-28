//inputs, buts, form
var $una = $('#eusr');
var $pwd = $('#epwd');
var $but = $('#logbut');
var $frm = $('#logform');

//errors divs
var $nex = $('#nexist');
var $ush = $('#ushrt');
var $nac = $('#nactive');
var $psh = $('#pshrt');

//content of inputs
var uname;
var pswrd;

$(document).ready(function(){
	$but.click(function(){
		uname = $una.val();
		pswrd = $pwd.val();
		if (uname.length < 4)
		{
			$ush.show(250).delay(3000).hide(250);
			return (false);
		}
		else
			socket.emit('existing', uname);
	});
	socket.on('nexist', function(){
		$nex.show(250).delay(3000).hide(250);
		return (false);
	});
	socket.on('exist', function(active){
		if (active == false)
		{
			$nac.show(250).delay(3000).hide(250);
			return (false);
		}
		if (pswrd.length < 8)
		{
			$psh.show(250).delay(3000).hide(250);
			return (false);
		}
		else
			$frm.submit();
	});
});