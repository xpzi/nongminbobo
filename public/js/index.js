//  首页的js文件  
// 文档加载部分
$(document).ready(function(){
	$(".head").load("public/html/header.html");
	$(".notice").load("public/html/notice.html" ,noticeCall);
	$(".banners").load("public/html/banner.html");
	$(".rightBox").load("public/html/rightBox.html");
	$(".footer").eq(0).load("public/html/footer.html");
	$(".foot").load("public/html/foot.html");
	
	getLouJson('public/json/linglou.txt' , ".linglou");
	getLouJson('public/json/linglou.txt' , ".yilou");
	getLouJson('public/json/linglou.txt' , ".erlou");
	getLouJson('public/json/linglou.txt' , ".sanlou");
	getLouJson('public/json/linglou.txt' , ".silou");
	getLouJson('public/json/linglou.txt' , ".wulou");
	getLouJson('public/json/linglou.txt' , ".liulou");
	getLouJson('public/json/linglou.txt' , ".qilou");
	//获取楼层的json文件
	function getLouJson( url , lou ){
		var lou = lou;
		//获取ajax数据后更新楼层的数据
		jQuery.ajax({
			url : url,
			dataType :"json",
			success:callback,
			type:"get"
		});
		
		function callback( data ){
				//console.log( data );
				//var lou =  lou || ".linglou";
				//console.log(lou);
				//teseL
				$(lou+" .spTuijianlist a ").prepend( $('<span>'+data.Data.nav.title + '</span>'));
				var cur = data.Data.nav.list;
				for(var i = 0 ; i < cur.length ; i++){
					if( cur[i].label  == 1){
						$(lou+ " .spTuijianlist p ").append('<a href="#" class="color1" >'+ cur[i].name+'</a>');	
					}else{
						$(lou+ " .spTuijianlist p ").append('<a href="#" class="color0" >'+ cur[i].name+'</a>');
					}
					
				}
				cur =data.Data.nav.ul;
				for(var i= 0; i< cur.list.length ; i++ ){
					$(lou + " .spTuijian1 .li").append($("<a href=\"#\"><i></i>"+ cur.list[i]+"/盒</a>"))	
				}
				$( lou + " .spTuijian1 img").attr('src', cur.imgsrc);
				
				//teseR
				//banenr
				cur = data.Data.banner;
				for(var i =0 ; i < cur.length ; i++){
					$(lou+ " .tesebanner ul").append(
						$('<li><a href="#"><img src="'+cur[i]+'" /></a></li>')	
					);
				}			
				//nav
				cur= data.Data.content;
				for(var i=0; i< cur.length ; i++){
					var tesenavli = $('<li><i></i>'+ cur[i].title +'</li>');
					if(i == 0){ tesenavli.attr('class' , "current");}				
					$(lou+' .teseR .tesenav').append(tesenavli);				
					var curdata = cur[i].data;
					var ul = $('<ul class="teseitem1"></ul>');
					for(var j = 0 ; j< curdata.length ; j++){
					 	ul.append($('<li><a href="list.html"><h3>'+curdata[j].name +'</h3><p>'+ curdata[j].price+' <del>'+curdata[j].marprice +'</del></p><img src="'+curdata[j].showpic+'" alt="" /></a></li>'));
					}
					$(lou+' .tesecon').append(ul);
				}
				
				//teseB
				cur = data.Data.logo;
				for(var i=0; i< cur.length ; i++){
					$(lou + " .teseB").append('<a href="#" class="dplogo1"><img title="'+cur[i].name+'" src="'+cur[i].src+'"/></a>');	
				}
				
				
				//调用特效
				loucengBanner(lou);
				loucengXiaoguoA(lou);
				loucengMouseOver(lou);
				
				
			}
	}
	
	/* 效果 特效 */ 
	function noticeCall(){
		//就是那个特效
//		$(".noticeB li a").click(function(){alert(0)});
		$(".noticeB li i").mouseover(function(){
			//alert("d");
			$(this).animate({
				"top": -10
		//		"margin-bottom" :10
			},200,function(){
				$(".noticeB li i").css("top" , "0");
			});
		});
	}
	
	
	
	//楼层中的那个效果 选择
	function loucengXiaoguoA(classname){
		$(classname+" .tesenav li").hover(function(){
			$(classname+" .tesenav li").attr('class', "");
			$(this).attr("class", "current");
			$(classname+" .teseitem1").css('display' , "none");
			$(classname+" .teseitem1").eq( $(this).index() ).css('display' ,"block");
		} , function(){});
	}
	//楼层中那个 鼠标移入效果
	function loucengMouseOver( classname ){
		$(classname+" .tesecon ul li").mouseover(function(){			
			$(this).siblings().css("opacity", "0.25");
			$(this).css("opacity", "1");
		});
		$(classname+" .tesecon").on("mouseout", function( event){
			$(this).find("li").css('opacity' , "1");			
		});
	}
	// banenr 楼层中的banner
	function loucengBanner(classname){
		var slider= $(classname+' .tesebanner').unslider({
			autoplay:true,
			arrows:false,
			delay:6000
		});
		$(classname+' .teseR nav li').hover(function(){
			$(this).trigger('click');
		},function(){});
	}
	
	
	/* 特卖中的效果 */
	//特卖中的banner
	function temaiBanner(xuanzeqi, nav){
		var slider= $(xuanzeqi).unslider({
			autoplay:true,
			arrows:false,
			delay:5000
		});
		$(nav).hover(function(){
			$(this).trigger('click');
		},function(){});
	}
	//倒计时
	function temaiDJS(){
		var is = 4;
		var djs = setInterval(function(){
			$(".temailist .timeRemain , .fengqiang .right .tiem").each(function(index){
				var djs = new Date().datePoor(new Date( parseInt( $(this).attr("data-date"))));
				$(this).html('<i></i><em>'+ djs.day+'</em>天<em>'+ djs.hours+'</em>小时 <em>'+ djs.minute+'</em>分<em>'+ djs.second+'</em>秒 ');
			});
			if(is){
				is--;
			}else{
				shaidanli();
				is = 6;
			}
			
		},1000);
	}
	temaiDJS();
	temaiBanner( ".temai .temailist" ,".temai .unslider nav li");
	temaiBanner( ".fengqiang .right" ,".fengqiang .unslider nav li");
	
	$(".shaidanli li").css("display" , "none");
	// shaidanli 换灯片 切换效果
	function shaidanli(  ){
		$(".shaidanli  .curr").removeClass("curr").addClass("oldcur");
		var cur = $(".shaidanli  .newcurr");
		var i = cur.removeClass("newcurr").addClass("curr").index(".shaidanli li");
		if( i == 0){
			i = $(".shaidanli li").length - 1;
		}else{
			i = i-1;
		}
		$(".shaidanli li:eq("+i+")").addClass("newcurr").fadeIn(1000);
		$(".shaidanli  .curr, .shaidanli  .oldcur").animate({"top" : "+=150px"},1000,function(){
			$(".shaidanli  .oldcur").stop().css({"top":"0px","display":"none"}).removeClass("oldcur");
		});
	}
	
	/*  传说中的楼梯效果   */
	$(".lounav li ").click(function(){
//		$(".lounav .cur").removeClass("cur");
//		$(this).find("a").addClass("cur");
		$("html, body").animate({"scrollTop": $(".tese").eq($(this).index()).offset().top - 50});
		return false;
	});
	
	$(document).scroll(function(){
		
		var cur = $(window).scrollTop();
		var h = $(window).height();
		
		if(($(".tese").eq(0).offset().top - h/2) > cur){
			$(".lounav").fadeOut();
		} else{
			var i = 0;
			$(".tese").each(function(index){
				var ch =  $(this).offset().top;
				//console.log( cur , h , ch );
				
				if( (ch - (h/2)) < cur ){
					i = index;
					console.log( index );
				}
			});
			$(".lounav .cur").removeClass("cur");
			$(".lounav li ").eq(i).find("a").addClass("cur");
			$(".lounav").fadeIn();
		}
		
		
	});

	
});



