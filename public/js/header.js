
//保存商品分类信息
var spType;
var sptypeinit = false;

$(document).ready(function(){
	
/*   获取商品分类，并添加到页面上       */
if( !sptypeinit ){
	sptypeinit = true;
	if( !(spType) ){
		getSpNum(function( data ){
			spType = JSON.parse( data.Data );
			spTypeInit(spType.data);
		});
	} else{
		spTypeInit(spType.data);
	}
	function spTypeInit(spType ){
		var allList = $('.allList'); //分类box
		var cur;
		for(var i = 0 ; i< spType.length ; i++){
			//liA : ul > li ;  divA: ul>li>div
			var liA = $('<li></li>');
			liA.hover(
				function(){
					$(this).attr('class', 'curr');
				},function(){
					$(this).attr('class', '');
				}
			);
			var divA = $('<div class="bt"><a href="#">'+spType[i].name + '</a><i></i></div>');
			cur = spType[i].child;
			var ulB = $('<ul class="conten"></ul>');		
			for(var j=0; j < cur.length; j++ ){
				var liB = $('<li></li>');
				var divb = $('<div class="bt0"><a href="#">'+ cur[j].name +'</a></div>');
				var divc = $('<div class="con"></div>');			
				for(var k=0 ; k <cur[j].child.length; k++ ){
					divc.append('<a href="#">'+ cur[j].child[k].name +'</a>');
				}
				liB.append(divb);
				liB.append(divc);
				ulB.append( liB );
			}		
			liA.append( divA );
			liA.append( ulB );
			allList.append( liA );
		}
	}
}



logoYanzheng();

	
	
});
/* 获取登录验证什么的  */
function logoYanzheng(){
	var user = userCookie.get();
//	console.log( user);
	if(user){
		user = JSON.parse( user );
		//在这里吧用户信息添加到页面上去
		$(".welcome span").css("color","#333333").html("欢迎 "+user.name+"！");
		var a = $('<a href="javascript:void(0);" class="tuichu">退出</a>').click(function(){
			userCookie.remove();
			$("#login").html('[<a href="login.html" class="login">登录</a>][<a href="login.html?reg=ff" class="refister">注册</a>]');
			$(".welcome span").css('color' , "#AAA").html('您好，欢迎来到');
		});
		$("#login").html("").append(a);
	}
}