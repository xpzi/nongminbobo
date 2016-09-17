$(document).ready(function(){
	var duanxin = "";
	
	$("#loginBox").attr('class', "register" );
	var span = $('<span>我已经注册，现在就要</span>');
	var a = $('<a href="#">登录</a>');
	a.click(function(){
		var str = window.location.href;
		 str = str.split("?")[0];
		window.location.href = str + "?login=ff";
		//$("#loginBox").load("public/html/login.html");
	});
	$(".header .right").html("");
	$(".header .right").append(span).append(a);		
	
	/* 页面动画  */
	$(".regCon .top h2").click(function(){
		$("input").trigger("change");
		var po ="0px";
		$(".regCon .top h2").toggleClass("curr");
		if($(this).index() == 0 ){
			po = "0px";
		} else{
			po = "-580px";
		}
		$(".conBox").animate({
			"left": po
		},400 );
	});
	
	/* 模拟手机号    */
	$("#senddx").click(function(){
		console.log(123);
		duanxin = ("000000"+ parseInt( Math.random()*1000000)).substr(-6) ;
		$("#duanxin").val(duanxin);
		return false;
	});
	
	
	
	
	/*  注册相关   */
	//获得焦点
	$("input").not("#zhuce").focus(function(){
		 $(this).parent().addClass("current");
	});
	//  失去焦点
	$("input").not("#zhuce").blur(function(){
		$(this).parent().removeClass("current");
	});
	$("input").not("#zhuce").change(function(){
		$(this).parent().removeClass("error");
	});
	
	/*  手机注册  */
	$("#user2").blur(function(){
		var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		var value = $(this).val();
		if( !(reg.test(value)) ){
			$(this).parent().addClass("error");
			$(this).parent().find("label em").html("请输入有效的手机号");
		}
	});
	$("#yanzhengma2").blur(function(){
		if(!($(this).val())){
			$(this).parent().addClass("error");
			$(this).parent().find("label em").html("请输入验证码");
		}
	
	});
	$("#duanxin").blur(function(){
		var value = $(this).val();
		if( value != duanxin ){
			$(this).parent().addClass("error");
			$(this).parent().find("label em").html("请输入正确的短信");
		}
	});
	$("#subLast").click(function(){
		$("conBox center:eq(1) input").trigger("blur");
			if( $("conBox center:eq(1) .error").length == 0  ){
				var user = {
					Id :0,
					Name : $("#user2").val(),
					password : $("#duanxin").val()
				}
				userRegister(user , function(data){
					console.log(data);
					if(data == "1"){
						chengogng("注册成功");
					} else{
						shibai("注册失败");	
					}
				});
			}
	});
	
	/* 用户名注册   */
	//用户名失去焦点 验证   验证用户名是否可用，和匹配
	$("#user").blur(function(){
		console.log("user");
		var user = $(this).val();
		var reg = /[A-Za-z0-9\-\u4e00-\u9fa5]{3,15}/;
		var html ="";
		console.log(user);
		console.log( !reg.test(user) );
		if( !reg.test(user) ){
			$(this).parent().addClass("error");
			if(!user){
				html = "用户名不能为空";
			}else{
				html = "请使用3-15个中、英文、数字及“-”符号";
			}
			$(this).parent().find("label em").html(html);
		} else{
			userNameCheck(user , function(data, self){
				//console.log( data ,self);
				if(data == "-1"){
					$(self).parent().removeClass("error");
				}else{
					$(self).parent().addClass("error");
					$(self).parent().find("label em").html("用户名已存在！");
				}
			}, this);
		}
	});
	
	//密码失去焦点  匹配密码
	$("#pass").blur(function(){
		var reg = /\S{6,20}/;
		var value = $(this).val();
		if(reg.test(value)){
			$(this).parent().removeClass("error");
		}else{
			$(this).parent().addClass("error");
			$(this).parent().find("label em").html("密码为：6-20个大小写英文字母、符号或数字");
		}
	});
	$("#yzpass").blur(function(){
		var value = $(this).val();
		var pass = $("#pass").val();
		if( value != pass ){
			$(this).parent().addClass("error");
			$(this).parent().find("label em").html("输入的密码不一致");
		}else{
			$(this).parent().removeClass("error");
		}
	});
	$("#emil").blur(function(){
		var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		var value = $(this).val();
		if(reg.test(value)){
			$(this).parent().removeClass("error");
		}else{
			$(this).parent().addClass("error");
			$(this).parent().find("label em").html("请输入正确的邮箱");
		}
	});
	$("#yanzhengma").blur(function(){
		var value = $(this).val();
		if( !value ){
			$(this).parent().addClass("error");
			$(this).parent().find("label em").html("请输入验证码");
		}else{
			$(this).parent().removeClass("error");
		}
	});
	$("#zhuce").click(function(){
		if( $("#tongyi").prop("checked")  ){
			$("conBox center:eq(0) input").trigger("blur");
			if( $("conBox center:eq(0) .error").length == 0  ){
				var user = {
					Id :0,
					Name : $("#user").val(),
					password : $("#pass").val(),
					ImgSrc: $("#emil").val()
				}
//				console.log( user );
				userRegister(user , function(data){
					console.log(data);
					if(data == "1"){
						chengogng("注册成功");
					} else{
						shibai("注册失败");	
					}
				});
			}
		}else{
			alert( "请阅读服务协议，并同意。" );
		};

		return false;
	});
	//$("input").trigger("blur");
	
	//zhuce 成功 
	function chengogng(){
		
	}
	//注册 失败
	function shibai(){
		
	}
	
});