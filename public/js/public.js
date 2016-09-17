/*   页面 处理  效果的 公共函数  方法      */



/*  购物车相关   */

//j进入页面就要啊  读取
function cartInit(){
	cart = baseCookie.getCookie("cart");
	if(cart){
		cartDocument(JSON.parse( cart) );
	}
}

//传入一个id  然后  就进行一拨儿 添加商品的逻辑操作
function addSpToCart(spid, nums){	
	// 检查 用户又没有登录，  没有，先保存到本地cookit  有 直接报存到用户 的 购物车里面
	var user = checkUserLogin();
	var nums = nums || 1;
	var cart;
	//if(user){
	if(false){
		//保存到 服务器  服务
		//baseCookie.setCookie("cart" , )
	}else{
		//得先读取本地的 购物车内容
		cart = baseCookie.getCookie("cart");		
		if( cart  ){
			cart= JSON.parse(cart);
			var flug = true;
			for( var i= 0 ; i < cart.length ; i++){
				if( cart[i].id == spid){
					 cart[i].num = parseInt( cart[i].num) + 1;
					 flug = false;
					 break;
				}
			}
			if(flug){
				cart.push({id: spid, num:nums});
			}
		} else{
			cart = [];
			cart.push({id: spid, num:nums});
		}
		cartDocument(cart);
		baseCookie.setCookie("cart", JSON.stringify( cart ));
		
	}
	//保存不行  还的显示出来
}
//传入商品Id  删除本地cookit 的商品
function delSpCookit( spid){
	var cart = baseCookie.getCookie("cart");
	cart = JSON.parse( cart);
	for(var i=0; i< cart.length ; i++){
		if( cart[i].id == spid ){
			cart.splice( i , 1 );
			break;
		}
	}
	baseCookie.setCookie("cart", JSON.stringify( cart ));
}
//对 页面的操作就在这里了
function cartDocument( cart ){
	console.log(cart);
	$(".myCart em , .mineCart em").css("display" , "block").html(cart.length );
}

//  获取本地 购物车  数据 
function getLocCartData(cart,callback){
	var arr=[];
	var sum = 0;	
	for(var i = 0; i< cart.length ; i++){
		arr.push(cart[i].id);
		sum = parseInt( cart[i].num) + sum;
	}
	getDanGeSp(arr , function(data){
		callback(data , sum);
	});
}









//购物车一面的 全局函数  
//购物车中 增加商品按钮
//ele  触发该事件的 对象
function cartAddSpNum( ele ){
	//1. 商品数量加一  
	//2. 商品总数  相加 
	$(ele).prev().val( parseInt( $(ele).prev( ).val() ) + 1 ) ;	
	var sumpri = jisuanSpAllPrice();
	return false;
}
function cartSubSpNum( ele ){
	var val = parseInt( $(ele).next( ).val());
	if( val > 1){
		$(ele).next().val( val -1 );
	}
	var sumpri = jisuanSpAllPrice();
	return false;
}
function cartDelsp(ele){
	//
	delSpCookit( $(ele).attr("data-id") );
	if($(ele).parents("tr").prev().attr("class") == "dplist"  ){
		$(ele).parents("tr").prev().remove();
	}
	$(ele).parents("tr").remove();
	
	jisuanSpAllPrice();
}

//  计算 选种 商品 的总价格   并设置
function jisuanSpAllPrice(){
	//  计算商品价格
	var num = $("table .item .num");
	if( num.length == 0){
		//执行没有物品的操作
		return;
	}
	var check = $(".item input[type=checkbox]");
	if( check.length == 0 ){
		//如果没有被选中是商品
		$(".tfooter a").addClass("noquren");
	} else{
		$(".tfooter a").removeClass("noquren");
	}
	var sumpri=0;	//总价格
	var sumnum = 0;//总数量
	var selectAllpri = 0;
	for( var  i= 0; i< num.length ; i++){
		var curpri = parseFloat( num.eq(i).attr("data-price") )* parseInt( num.eq(i).val() );
		sumpri +=  curpri ;
		sumnum += parseInt( num.eq(i).val() );
		if( check.eq(i).prop("checked") ){
			selectAllpri += curpri;
		}
	}
	sumpri = sumpri.toFixed(2);
	selectAllpri = selectAllpri.toFixed(2);
	$(".tfooter span").html(selectAllpri);
	return sumpri;
}

/*  用户登录相关  */
//检查 用户又没有登录
function checkUserLogin(){
	var user = userCookie.get();
	if(user){
		return JSON.parse(user);
	}else{
		return user;
	}
}




/*  商品加载相关  */

//逐个获取所需要你的所有商品
// arr  商品id数组
// callback  回调函数
function getDanGeSp( arr , callback){
	var arr = arr;
	var i = 0;
	back(false);
	function back(data){
		if(data){
			//如果获取成功 调用 该函数进行  页面操作
			callback( JSON.parse( data.Data ) );
		}
		if( i < arr.length ){
			//这里是 获取单个商品的数据
			getSpOnce(arr[i], back );
			i++;
		}			
	}
}