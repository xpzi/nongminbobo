//var $ = $;
var spType;
var docloadfinsh = 2;
$(document).ready(function(){
	var spIdArr;

	/* 文档加载 */
	$(".head").load("public/html/header.html",headCallBack);
	$(".rightBox").load("public/html/rightBox.html", rightBoxCallBack);
	$(".footer").eq(0).load("public/html/footer.html");
	$(".foot").load("public/html/foot.html");
	
	
	/* 生成页面类容  */
	//1.首先得拿到数据    通过 那个对象脸
	//2.获取所有商品id
	
	if( !(spType) ){
		getSpNum(function(data){
			spType = JSON.parse( data.Data );
			getSpList(1);
		});
	} else{
		getSpList(1);
	}
	
	//page 要查询的第几页 从第一页开始
	function getSpList( page ){
		if(!spIdArr){
			spIdArr = querySp([0] , spType );
		
			//去掉重复项
			for(var  i = 0 ; i< spIdArr.length - 1 ; i++){
				for(j = i+1 ; j< spIdArr.length ; j++){
					if( spIdArr[i] == spIdArr[j]){
						spIdArr.splice(j, 1);
						j--;
					}
				}
			}
			
			// 默认  id从大到小排序
			spIdArr.sort(function(a, b){ return  b -a;});
			console.log(spIdArr );
		}
		var href = getHreFCanshu();
		if( href.keyword){
			getDanGeSp( spIdArr , function(data){
				console.log( data.name);
				var keyw = decodeURIComponent( href.keyword);
				if( typeof  data.name != "undefined" && typeof data.keyword != "undefined" ){
					newname = data.name.replace(keyw, '<span style="color:green">'+keyw+'</span>');
					newkeyword = data.keyword.replace(keyw, '<span style="color:green">'+keyw+'</span>');
					
					if( newname != data.name || newkeyword != data.keyword ){
						data.name = newname;
						data.keyword = newkeyword;
						console.log( newkeyword , data.keyword, newname  , data.name);
						addsptopage(data);
					}
				}	
			});
		} else{
			feyechanxu(page);
		}
		function feyechanxu( page ){
			var pagesize = 24;
			var start = (page -1)*pagesize;
			var end =  Math.min( page*pagesize, spIdArr.length - 1);
			if( start > end ){
				// 执行   没有数据 的操作  
			} else{
				var arr = [];
				for(var i= start; i <= end ; i++ ){
					arr.push(spIdArr[i] );
				}
				getDanGeSp( arr,addsptopage );
			}
			
		}
		
		//添加商品到页面上  一次添加一条
		function addsptopage(data ){
			//console.log( data);
			var li = $('<li></li>');
			var div = $('<div></div>');
			var html1 = '<a href="details.html?id='+data.Id+'"><img src="'+
					data.showpic + '"/></a><p class="price"><b><em>¥</em>'+
					data.price +'</b><del>¥'+
					data.marprice +'</del><img src="http://img.nongminbb.com//shop/contracticon/psbf_60.gif" alt="" /><img src="http://img.nongminbb.com//shop/contracticon/pz_60.gif" alt="" /></p><p class="jianjie"><a href="details.html?id='+data.Id+'">'+
					data.name+'<span>'+
					data.keyword+'</span></a></p><p class="dj"><a href="#" class="l"><i></i>'+
					data.share+'</a><a href="#" class="r">'+
					data.store+'</a></p>';
			var html2 = '<div class="duibi"></div>';
			var but = $('<button data-spid="'+data.Id+'">加入购物车</button>').click(function(){
//				alert( $(this).attr('data-spid'));
				addSpToCart( $(this).attr('data-spid') );
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
			});
			div.append(html1).append(but).append(html2);
			li.append(div);
			
			
//			var liHtml = '<li><div><a href="details.html?id='+data.Id+'"><img src="'+
//					data.showpic + '"/></a><p class="price"><b><em>¥</em>'+
//					data.price +'</b><del>¥'+
//					data.marprice +'</del><img src="http://img.nongminbb.com//shop/contracticon/psbf_60.gif" alt="" /><img src="http://img.nongminbb.com//shop/contracticon/pz_60.gif" alt="" /></p><p class="jianjie"><a href="details.html?id='+data.Id+'">'+
//					data.name+'<span>'+
//					data.keyword+'</span></a></p><p class="dj"><a href="#" class="l"><i></i>'+
//					data.share+'</a><a href="#" class="r">'+
//					data.store+'</a></p>'+ a+'<button data-spid="'+data.Id+'">加入购物车</button><div class="duibi"></div></div></li>';
//			//$(".splist ul").prepend(liHtml);
			$(".splist ul").append(li);
			//$(".splist ul button"));
		}
	}
	
/*功能函数*/
// 页面效果  
function headCallBack(Text ,status ,XML){
	docloadfinsh -- ;
	if(!docloadfinsh){
		
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


//分类查询商品，
//返回商品id列表 数组
//numlist   分类数组  注意 ， 值不是分类id 而是，分类下子分类数组下标
//typelist  分类对象
function querySp(numlist , typelist ){
	var arr=[];
//	numlist = addSp.numlist.concat([]);		
//	typelist = addSp.typelist;
	
	if(numlist[numlist.length -1]==0 && numlist.length>1){
		numlist.pop();
	}
//	console.log(addSp.numlist);
//	console.log( numlist );
	//console.log( typelist );
	
	if(numlist != "0"){
		for(var i = 0 ; i < numlist.length; i++ ){
			if(i == 0){
				typelist = typelist.data[ numlist[i] -1];				
			} else{
				typelist = typelist.child[ numlist[i] -1];				
			}
			console.log(typelist);
			arr = arr.concat(typelist.splist);
		}
		childArr(typelist.child);
	}else{
		childArr(typelist.data);
	}		
	return arr;
	function childArr(childs){
		//
		for( var i =0 ; i< childs.length ; i++ ){
			//console.log( childs );
			arr = arr.concat(childs[i].splist);
			childArr(childs[i].child);
		}
	}		
}

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
			i++;
			//这里是 获取单个商品的数据
			getSpOnce(arr[i], back );
		}			
	}
}

});
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

