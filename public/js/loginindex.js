$(document).ready(function(){
	$("#loginBox").attr('class', "loginBox" );
	var img = $('<img src="http://img.nongminbb.com//shop/common/default_user_portrait.gif"/>');
	var span = $('<span><b>您好，欢迎来到农民伯伯<br />已注册的会员请登录，或立即</b>');
	var a = $('<a href="#">注册新会员</a>');
	a.click(function(){
		var str = window.location.href;
		 str = str.split("?")[0];
		window.location.href = str + "?reg=ff";
		//$("#loginBox").load("public/html/zhuce.html");
		
	});
	span.append(a);
	$(".header .right").html("");
	$(".header .right").append(img).append(span);		
	
	
	
	$('input[type=submit]').click(function(){
		var user = getUserInfo();		
		if(user){
			yanzhengUser(user);
		}
		return false;
	});
	
	//获取用户 输入的信息 并验证基本条件
	function getUserInfo(){
		var user = false;
		var name =  $('#user').val();
		var pass = $('#pass').val();
		var yzm = $('#yanzhengma').val();//验证码
		if( !name ){
			alert("请输入用户名");
		} else if(!pass){
			alert("请输入密码");
		} else if(!yzm){
			alert("没有填写验证码");
		}else{
			user = {
				name: name,
				pass:pass,
				yzm:yzm
			};
		}
		return user;
	}
	
	//请求服务器，完成用户的 用户名与密码的验证  逻辑在这里继续不返回了；
	function yanzhengUser(user){
		userLoginCheck(user.name , user.pass,function(data){
			if(data == "1"){
				//验证成功，实现登录的功能
				chengong("登录成功");
			}else{
				//验证失败 ， 执行提示信息的显示
				shibai("登录失败");
			}
		});
		return false;
	}
	
	//登录成功
	function chengong(){
		if($("#autologin").prop("checked") ){
			//自动登录
			var user = {
				name: $('#user').val(),
				pass : $('#pass').val()
			}
			userCookie.set( JSON.stringify( user) );
		}
		window.location.href = "index.html";
	}
	//登录失败
	function shibai(){
		alert("登录失败");
	}
});

