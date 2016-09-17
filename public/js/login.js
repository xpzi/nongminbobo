/*文件说明：
 * 	与cookit相关的函数方法都写到这个文件里。
 * 		1. 读取，保存cookie
 * 		2. 后台登录验证cookie
 * */




/*****  1. 读取，保存cookie 基本结构 ****/
var baseCookie = {
	//读取cookit
	getCookie: function(c_name){		
		var cookit;
		if( document.cookie.length > 0 ){
			var index = document.cookie.indexOf( c_name + "=");
			var end = -2;
			if( index != -1 ){
				start = index + c_name.length + 1;
				end = document.cookie.indexOf(";", start);
			}			
			if( end != -2){
				if(end == -1){
					end = document.cookie.length;
				}
				cookit =  decodeURIComponent( document.cookie.substring(start, end) );
			}
			
		}
		//console.log( cookit );
		return cookit;
	},
	//设置cookie
	setCookie:function( c_name, value, data, ismin){
		var exdate = new Date();
		if(ismin){
			exdate.setMinutes ( exdate.getMinutes() + data);
		}else{
			exdate.setDate( exdate.getDate() + data);
		}	
		document.cookie = c_name + "=" + encodeURIComponent(value) + ((data == null) ? "" : "; expires=" + exdate) ;
	},
	//删除cookie
	removeCookie:function(c_name){
		this.setCookie(c_name , '' , -1);
	}
};


/**********        2.验证用户登录      *************/
var userCookie = {
	get:function(){
		var get = baseCookie.getCookie('user');
		if(get){
			return get;
		} else{
			return false;
		}
	},
	set: function(value){
		baseCookie.setCookie('user' , value, 7 );
	},
	remove:function(){
		baseCookie.removeCookie('user');
	}
}



/**********        2.验证后台登录      *************/
// 后台登录 cookie c_name:  admin ; date : 10min;
var adminCookie = {
	get:function(){
		var get = baseCookie.getCookie('admin');
		if(get){
			return get;
		} else{
			return false;
		}
	},
	set: function(value){
		baseCookie.setCookie('admin' , value, 10, true );
	},
	remove:function(){
		baseCookie.removeCookie('admin');
	}
}	

