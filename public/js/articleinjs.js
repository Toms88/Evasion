var tdiv, upfo, mori, send, upds, view, num, tot, tmp;
tdiv = document.getElementById("tdiv");
upfo = document.getElementById("upform");
mori = document.getElementById("moreup");
send = document.getElementById("send");
upds = document.getElementById("uploads");
view = document.getElementById("view");
tot = document.getElementById("num");
num = 2;
mori.onclick = function(){
	tmp = parseInt(tot.value) + 1;
	console.log(tmp);
	tot.value = tmp.toString();
	num = tmp;
	var name = "img" + num;
	var span = '<span class="col-xs-2 col-sm-2 col-md-1 col-lg-1">IMAGE : </span><input type="file" name=' + name + ' class="col-xs-10 col-sm-10 col-md-11 col-lg-11">';
	upds.innerHTML += span;
};
send.onclick = function(){
	tinyMCE.triggerSave(true, true);
	upfo.submit();
};

function verif(form)
{
	tinyMCE.triggerSave(true, true);
	if (form)
	{
		var i = 0;
		var test = form.article.value;
		console.log('start : ' + test);
		while (i < num)
		{
			var rep = "img" + (i + 1);
			var rept = "%" + rep + "%";
			console.log(rept);
			var path = "/img/<%= articles.Num %>/" + rep + ".png";
			console.log(path);
			var sch = "<img class=\"col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-1 col-sm-offset-1\" src=\"" + path + "\">";
			console.log(sch);
			test = test.replace(rept, sch);
			i++;
		}
		var ps = "<p class=\"intro text-justify text\">";
		var p = /<p>/ig;
		test = test.replace(p, ps);
		console.log('final : ' + test);
		form.article.value = test;
		console.log('form value : ' + form.article.value);
	}
}