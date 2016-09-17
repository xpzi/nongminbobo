/*  购物车   */
//管他三七二十一  先看看有没有登录
var user = userCookie.get();
if( !user ){
	window.location.href = "login.html";
}



$(function(){
	//加载文件呢 
	$(".head").load("public/html/header.html #topBox" , headCallBack);
	$(".foot").load("public/html/foot.html");
	
	//检查本地有没有 购物车 cookie
	var cartLoc =  baseCookie.getCookie("cart");
//	console.log( cartLoc);
	if( cartLoc ){
		//有就先保存到服务器去  ———— 没有接口
		getCartServer(cartLoc);
	}else{
		//getCartServer();
	}
	
	//获取 用户 保存在服务器上面的数据
	function getCartServer( cartLoc ){
		//....
		
		//由于没有 借口  直接从本来coolie获取  没有就没有咯
		var cartLoc = JSON.parse( cartLoc);
		//console.log( cartLoc);
		getLocCartData(cartLoc, function(data, sum){
			console.log(data);
			console.log( cartLoc );
			var flug = true;
			var dplist = $(".dplist");
			var curlist;
			for(var i=0; i< dplist.length ; i++ ){
//				console.log( $(this).find('a').text()  );
//				console.log( data.store );
				if( dplist.eq(i).find('a').html() == data.store){
					flug = false;
					curlist = dplist.eq(i);
					break;
				}
			}
			if( flug ){
				//创建  店铺  节点
				var dianpu =  $('<tr class="dplist"><th colspan="7">店铺：<a href="#">'+data.store+'</a></th></tr>');
				// 然后加载到  开始  嘿嘿
				$(".theader").after(dianpu);
				curlist = dianpu;
			} else{
				
			}
			data.num = 0;
			for(var i=0;  i< cartLoc.length ; i++ ){
				if( data.Id == cartLoc[i].id ){
					data.num = cartLoc[i].num;
					break;
				}
			}					
			var html = '<tr class="item"><td class="td1"><input type="checkbox" onclick="jisuanSpAllPrice();" name="" id="" value="" /></td><td class="td2"><a href="#"><img src="'+
					data.showpic+'"></a></td><td class="td3"><p class="jianjie"><a href="#">'+
					data.name+'</a></p><p class="fuwu"><span title="7天退货"> <img src="http://img.nongminbb.com//shop/contracticon/7day_60.gif"> </span><span title="品质承诺"> <img src="http://img.nongminbb.com//shop/contracticon/pz_60.gif"> </span><span title="破损补寄"> <img src="http://img.nongminbb.com//shop/contracticon/psbf_60.gif"> </span><span title="急速物流"> <img src="http://img.nongminbb.com//shop/contracticon/jswl_60.gif"> </span></p></td>	<td class="td4"><p class="price">'+
					data.price+'</p><div class="huodong"><span>商家促销<i></i></span><div><p>活动名称：团购</p>	<p>最多限购：<strong>200件</strong></p></div></div></td><td class="td5"><a onclick="cartSubSpNum(this);" href="javascript:void(0);" class="jian">-</a><input type="text" class="num" data-price="'+
					data.price+'" value="'+
					data.num+'" /><a href="javascript:void(0);" onclick="cartAddSpNum(this);" class="jia">+</a></td><td class="td6"><span class="xiaoji">'+
					data.price+'</span></td><td class="td7"><a class="shoucang" href="javascript:void(0);">移入收藏夹</a><br />	<a class="del"  onclick="cartDelsp(this);" data-id="'+
					data.Id+'" href="javascript:void(0);">删除</a></td>	</tr>';
					
			curlist.after($(html));
			jisuanSpAllPrice();
		});
		
		
		

	}
	
	
	
//全部选种按钮
$("#allselect").click(function(){
	console.log( $(this).prop('checked'));
	if( $(this).prop('checked') ){
		$(".item input[type=checkbox]").attr("checked" ,true);
	}else{
		$(".item input[type=checkbox]").attr("checked" , false);	
	}
	jisuanSpAllPrice();
});


	

// 页面效果  
function headCallBack(Text ,status ,XML){
	$(this).find(".allList").css("display" , "none");
	$(".all-category ").hover(function(){
		$(this).find(".allList").css("display" , "block");
	},function(){
		$(this).find(".allList").css("display" , "none");
	});
	cartInit();
	logoYanzheng();
	//$(".all-category").toggle("mouseout");
}

});
