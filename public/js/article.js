/**
 * Created by tchezier on 12/05/15.
 */
//inputs, buts, form
var $tdiv = $('#tdiv');
var $upfo = $('#upform');
var $mori = $('#moreup');
var $send = $('#send');
var $upds = $('#uploads');
var $view = $('#view');
var num = 1;
$(document).ready(function(){
   $mori.click(function() {
       console.log('yes !');
       num++;
       var name = "img" + num;
       var img = '<span class="col-xs-2 col-sm-2 col-md-1 col-lg-1">IMAGE : </span><input type="file" name=' + name + ' class="col-xs-10 col-sm-10 col-md-11 col-lg-11">';
       $upds.append(img);
   });
   $send.click(function(){
       $upfo.submit();
   });
});
