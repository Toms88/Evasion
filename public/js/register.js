var $user = $('#username');
var $ulen = $('#ulen');
var $veruser = $('#veruser');
var $register = $('#regform');
var $but = $('#regbut');
var $mdp = $('#password');
var $mdp2 = $('#password2');
var $mdplen = $('#mdplen');
var $diffp = $('#diffp');
var $phn = $('#phone');
var $pherr = $('#phonever');

var username;
var phone;
var password;
var password2;

$(document).ready(function(){
	$but.click(function(){
		username = $user.val();
		password = $mdp.val();
		password2 = $mdp2.val();
		phone = $phn.val();
		if (username.length < 4)
		{
			$ulen.show(250).delay(3000).hide(250);
			return (false);
		}
		else
			socket.emit('existing', username);
	});


	//socket.io part
	socket.on('exist', function()
	{
		$veruser.show(250).delay(3000).hide(250);
		return (false);
	});
	socket.on('nexist', function(){
		if ((phone[0] != "0") || (phone.length != 10))
		{
			$pherr.show(250).delay(3000).hide(250);
			return (false);
		}
		if (password.length < 8)
		{
			$mdplen.show(250).delay(3000).hide(250);
			return (false);
		}
		else
		{
			console.log('on est bien ici !');
			if (password != password2)
			{
				$diffp.show(250).delay(3000).hide(250);
				return (false);
			}
			else
			{
				console.log('submit');
				$register.submit();
			}
		}
	});
});
