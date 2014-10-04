// ==UserScript==
// @name        可口可乐兑换码
// @author      onisuly
// @description 内部测试
// @namespace   onisuly
// @include     http://event.dota2.com.cn/dota2/cocataobao/index
// @version     2014.06.22
// @run-at      document-end
// @grant       none
// ==/UserScript==

document.getElementById("ddt").childNodes.item(1).href =  "http://passport.wanmei.com/dota/emailreg.jsp";

var exeinterival = 100; //生成假码的时间间隔，可自行更改，单位：毫秒
var chckinterival = 10000; //检测是否仍然与完美的逗比服务器保持连接的时间间隔，单位：毫秒

var exeint = null;
var chckint = null;

if( username != "" ) {
	exeint = setInterval(execute,exeinterival);
	chckint = setInterval(recheckLogin,chckinterival);
}

function genCode() {
	var codeSequence = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K',
	                    'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
	                    ];
	
	var code = "DOTA08";
	
	for( var i = 0; i < 6; ++i ) {
		code = code + codeSequence[ parseInt( Math.random() * 35 + 1 ) ];
	}
	
	return code;
}

function execute() {
	document.getElementsByName("card")[0].value = genCode();
    
    $("#form1").ajaxSubmit({
	    success: function(data) {
	        if( data.message == "对不起，您的兑换次数已达到上限，无法再次获得。" ) {
	            $.simpleAlert(data.message);
	            clearInterval(exeint);
	            clearInterval(chckint);
	        }
	        else if( data.message == "恭喜您成功获得1次兑换次数！" ) {
	        	changeTimes(1);
	        }
	    }
    });
}

function recheckLogin() {
	$.getJSON('/dota2/cocataobao/checkLogin',{r:Math.random()},function(data){
        if(!data.success){
        	login();
        }
    });
}
