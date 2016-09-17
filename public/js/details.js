var spType;
var docloadfinsh = 2;
/* 商品详情页 js */
$(document).ready(function(){
	/* 文档加载 */
	$(".head").load("public/html/header.html", headCallBack);
	$(".rightBox").load("public/html/rightBox.html",rightBoxCallBack);
	$(".footer").eq(0).load("public/html/footer.html");
	$(".foot").load("public/html/foot.html");
	
	
	
	
	//第一步还是获取商品 的 信息  这里 当然需要id  id从哪儿来呢！  当然是从 地址栏
	var Id = getHreFCanshu();
	if(Id.id ){
		//如果id存在
		Id = Id.id;
	}else{
		Id = 10;
	}
	//有了id就可以去拿数据了
	getSpOnce(Id , function(data){
		data = JSON.parse(data.Data );
		// 拿到数据过后就可以网页面上添加了呀
		// 放大镜大图  和放大镜列表
		$(".imgfangda .img img").attr({
			'rel':data.showpic,
			"src":data.showpic
		});
		$(".imgfangda .imglist img").attr("src" ,data.showpic);
		$(".imgfangda .funclist .fx").html('分享('+data.share+')');
		
		//标题那一部分
		$('.spinfo .spbt1 h2').html(data.name);
		$('.spinfo .spbt1 h3').html(data.keyword);
		$('.spinfo .spPrice .mar del').html('¥'+data.marprice);
		$('.spinfo .spPrice .mall strong').html('<i>¥</i>'+data.price);
		$('.spinfo .spPrice .mall em').html('(原售价：¥'+data.price+')');
		
		//商店名字那一部分
		$('.dpinfo .dpbt a').html(data.store);
		$('.dpinfo .dplink .dpbt4').html(data.store);
		console.log(data);
	});
	
	$(".goumai .jia").click(function(){
		$("#spnum").val( parseInt($("#spnum").val()) +1  );
	});
	$(".goumai .jian").click(function(){
		var val =  parseInt( $("#spnum").val());
		if( val > 1){
			$("#spnum").val(val -1);
		}
	});
	// 加入购物车
	$(".jiacar, .lijigoumai ").click(function(e ){
		e.preventDefault();
		addSpToCart(Id , parseInt( $("#spnum").val()));
		var div = $('<div style="position:absolute; background:#f55; z-index:1000000; top:'+$(this).offset().top+'px; left:'+$(this).offset().left+'px; height:50px; width:50px; border-radius:5px;"><div>');
		$("body").prepend( div);
		var mycart = $('.myCart').offset();
		div.animate({
			top: mycart.top+10,
			left: mycart.left+10,
			height:5,
			width:5
		},300,function(){
			div.remove();
		});
		//alert( "商品添加成功" );
	});
	
	//放大镜部分
	$(".jqzoom").imagezoom();
	$(".imgfangda .imglist img").mouseover(function(){
		//增加点击的li的class:tb-selected，去掉其他的tb-selecte
		$(this).parents("li").addClass("cur").siblings().removeClass("cur");
		//赋值属性
		$(".jqzoom").attr('src',$(this).attr("src"));
		$(".jqzoom").attr('rel',$(this).attr("src"));
	});
	








/*  页面效果   */
function headCallBack(Text ,status ,XML){
	docloadfinsh -- ;
	if(!docloadfinsh){
		cartInit();
	}
	$(this).find(".allList").css("display" , "none");
	$(".all-category ").hover(function(){
		$(this).find(".allList").css("display" , "block");
	},function(){
		$(this).find(".allList").css("display" , "none");
	});	
	//$(".all-category").toggle("mouseout");
}
//文档加载完成的回调函数
function rightBoxCallBack(Text ,status ,XML){
	docloadfinsh -- ;
	if(!docloadfinsh ){
		cartInit();
	}
}
	
	
	
});
/* 函数部分 */
//获取地址来的参数
function getHreFCanshu(){
	var str = window.location.href;
	var str = str.split("?")[1];
	var arr = [];
	var obj = {};
	if(str){
		arr = str.split("&" );
	}
	for(var i= 0; i< arr.length ; i++){
		arr[i] = arr[i].split("=");
		obj[arr[i][0]] = arr[i][1];
	}
	return obj;
}