String.prototype.format = function(args) {
	var result = this;
	if (arguments.length < 1) {
		return result;
	}
	var data = arguments;        
	if (arguments.length == 1 && typeof (args) == "object") {
		data = args;
	}
	for (var key in data) {
		var value = data[key];
		if (undefined != value) {
			result = result.replace("{" + key + "}", value);
		}
	}
	return result;
}
var  barrager_code=
	'var item={\n'+
	"   img:'{img}', //图片 \n"+
	"   info:'{info}', //文字 \n"+
	"   href:'{href}', //链接 \n"+
	"   close:{close}, //显示关闭按钮 \n"+
	"   speed:{speed}, //延迟,单位秒,默认6 \n"+
	"   bottom:{bottom}, //距离底部高度,单位px,默认随机 \n"+
	"   color:'{color}', //颜色,默认白色 \n"+
	"   old_ie_color:'{old_ie_color}', //ie低版兼容色,不能与网页背景相同,默认黑色 \n"+
	" }\n"+
	"$('body').barrager(item);"
	;

$(function() {

	SyntaxHighlighter.all();
	$(".pick-a-color").pickAColor();

	var  default_item={
			'img':'static/heisenberg.png',
			'info':'弹幕文字信息',
			'href':'http://www.yaseng.org',
			'close':true,
			'speed':6,
			'bottom':70,
			'color':'#fff' ,
			'old_ie_color':'#000000'
	};
	var item={'img':'static/img/heisenberg.png','href':'http://www.baidu.com','info':'Jquery.barrager.js 专业的网页弹幕插件'};
	//item1={'href':'http://www.baidu.com','info':'这是一条很长很长的字幕','close':false};
	$('#barrager-code').val(barrager_code.format(default_item));


	$('body').barrager(item);
	//每条弹幕发送间隔
	var looper_time=1000;
	//是否首次执行
	var run_once=true;
	// do_barrager();

	function do_barrager(){
		if(run_once ){
			//如果是首次执行,则设置一个定时器,并且把首次执行置为false
			looper=setInterval(do_barrager,looper_time);                
			run_once=false;
		}
		//获取
		$.getJSON('server.php?mode=1',function(data){
			//是否有数据
			if(data.info){

				$('body').barrager(data);
			}

		});
	}

	function barrager(){
	}
});

function  run(info){
//	var  info=$('input[name=info]').val();
	(info == '' ) ?  info='请填写弹幕文字' : info=info;
	var  href=$('input[name=href]').val();
	// var  speed=parseInt($('input[name=speed]').val());
	var  speed=parseInt('6');
	// var  bottom=parseInt($('input[name=bottom]').val());
	var  bottom=parseInt("70");
	var  code=barrager_code;
	// if($('input:radio[name=bottomradio]:checked').val() == 0){
	var  window_height=$(window).height()-150;
	bottom=Math.floor(Math.random()*window_height+40);
	code=code.replace("   bottom:{bottom}, //距离底部高度,单位px,默认随机 \n",'');

	// }

	// var  img=$('input:radio[name=img]:checked').val();
	var img = "cute.png";

	if   (img == 'none' ){

		code=code.replace("   img:'{img}', //图片 \n",'');
	}

//	var colors = ['#FF0000','#0000FF','#FF00FF','#FFFF00','#FFFFFF'];

	var  item={
			'img':'static/img/'+img,
			'info':info,
			'href':href,
			'close':true,
			'speed':speed,
			'bottom':bottom,
			'color':'#'+$('input[name=color').val(),
			// 'color':'#'+Math.floor(Math.random()*256).toString(10),
			'old_ie_color':'#'+$('input[name=color').val()
			// 'old_ie_color':'#' + colors[Math.round(Math.random()*3)]
	}
	if(!$('input[name=close]').is(':checked')){


		item.close=false;


	}


	code=code.format(item);
	console.log(code);
	$('#barrager-code').val(code);
	eval(code);


}

function  clear_barrage(){

	$.fn.barrager.removeAll();
}

var websocket = null;

//判断当前浏览器是否支持WebSocket
if('WebSocket' in window){
	websocket = new WebSocket("ws://120.25.236.233:8080/DanMu/websocket");
}
else{
	alert('您的浏览器暂不支持websocket')
}

//连接发生错误的回调方法
websocket.onerror = function(){
	setMessageInnerHTML("连接错误");
};

//连接成功建立的回调方法
websocket.onopen = function(event){
	setMessageInnerHTML("连接成功");
}

//接收到消息的回调方法
websocket.onmessage = function(event){
	setMessageInnerHTML(event.data);
}

//连接关闭的回调方法
websocket.onclose = function(){
	setMessageInnerHTML("关闭");
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function(){
	websocket.close();
}

//将消息显示在网页上
function setMessageInnerHTML(innerHTML){
//	document.getElementById('message').innerHTML += innerHTML + '<br/>';
	run(innerHTML);
	
}

//关闭连接
function closeWebSocket(){
	websocket.close();
}

//发送消息
function send(){
	var message = document.getElementById('text').value;
	var color = document.getElementById('color').value;
	websocket.send(message+"&&"+color);
}
