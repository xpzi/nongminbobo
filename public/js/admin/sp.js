	
$(document).ready(function(){
	function clearTbItem(){
		$('#sptb tr:gt(0)').remove();
	}
	//没有找到商品
	function meiyouzhaodao(){
		$('#sptb').append( "<tr><td colspan='4'>没有找到商品</td> </tr> " );
	}
	//表格数据增加
	function addItem(  data ){
		//console.log( data );
		$('#sptb').append( "<tr><td> "+ data.Id +"</td><td> "+ data.name + 
		" </td><td> "+ data.price +"元</td> <td> <a data-id=\""+ data.Id +"\" onclick=\"xiugai(this);\" class=\"xiugai\">修改 </a> <a data-id=\""+ data.Id +"\"  onclick=\"shanchu(this);\" class=\"shanchu\" > 删除</a></td> </tr> " );
	}
	//分页商品 获取后的回调函数
	function fn(data){	
		for(var i = 0 ; i< data.length ; i++  ){
			var dat =  data[i];
			if(dat.Id != '000' ){
				addItem( JSON.parse(dat.Data));
			}				
		}
	}
	getSpList(fn);
	//分类查询商品， 返回商品id列表 数组
	function querySp(){
		var arr=[];
		numlist = addSp.numlist.concat([]);		
		typelist = addSp.typelist;
		if(numlist[numlist.length -1]==0 && numlist.length>1){
			numlist.pop();
		}
		console.log(addSp.numlist);
		console.log( numlist );
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
				console.log( childs );
				arr = arr.concat(childs[i].splist);
				childArr(childs[i].child);
			}
		}		
	}
	
	function getDanGeSp( arr ){
		var arr = arr;
		var i = 0;
		back(false);
		function back(data){
			if(data){
				//如果获取成功 调用 该函数进行  页面操作
				addItem( JSON.parse( data.Data ) );
			}
			if( i < arr.length ){
				i++;
				getSpOnce(arr[i], back );
			}			
		}
	}
	$('button[type=buttonSp]').click(function(){
		clearTbItem();
		var arr = querySp();
		console.log(arr);
		if( arr.length > 0 ){
			getDanGeSp( arr );
		} else{
			meiyouzhaodao();
		}
		
		return false;
	});
});





//修改商品跳转函数
function xiugai(obj){
	var id  = $(obj).attr('data-id');	
	window.mydata = {spid: id };
	$('.content').load('addsp.html');
}
//删除商品
function shanchu(obj){
	var id  = $(obj).attr('data-id');	
	var name = $(obj).parent().siblings().eq(1).html() ;
	$('#myModal').modal();
	$('.modal-body').append( '<p style="padding:40px;">'+name +'</p>');
	$('.btn-primary').click(function(){
		
		$('.modal-body').html('<p style=" height:100%; width:100%; text-align: center; line-height: 60px;">正在删除</p>');
		delSpGet( id, delback );
		function delback(data){
			$('.modal-body').html('<p style=" height:100%; width:100%; text-align: center; line-height: 60px;">删除成功</p>');
			$('#myModal').modal('hide');
			$('.modal-body').html('<p>点击确定将删除</p>');
		}
	});
}