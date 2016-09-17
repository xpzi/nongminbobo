//$(document).ready(function(){

//alert('aaa');

if(window.mydata){
	var spid = window.mydata.spid;
	getSpOnce(spid, call);
	function call(data){
		var data = JSON.parse(data.Data);
		//console.log( data );
		setInputData(data);
	}
} else{
	setInputData({Id:'new'});
}

function setInputData(data){
		$('input[name=spid]').eq(0).val(data.Id);
		$('input[name=share]').eq(0).val(data.share);
		$('input[name=name]').eq(0).val(data.name);
		$('input[name=price]').eq(0).val(data.price);
		$('input[name=marprice]').eq(0).val(data.marprice);
		$('input[name=showpic]').eq(0).val(data.showpic);
		$('input[name=keyword]').eq(0).val(data.keyword);
		$('input[name=store]').eq(0).val(data.store);
		$('#detail').val(data.detail);
}

$('button[type=submit]').click(function(){
	var data = getData();
	if( data.share == ""){
		data.share = parseInt(Math.random()*100+1);
	}
	console.log( data);
	var numlist =  addSp.numlist.concat([]);
	if(numlist[numlist.length -1]==0 && numlist.length>1){
			numlist.pop();
	}
	addSpPost(data ,numlist ,  addSpFn );
	return false;
});
//添加商品的回调函数
function addSpFn( data ){
	console.log( data);
	if(data == '1'){
		alert("商品添加成功");
	}	
}
function getData(){
	var data = {
		Id:$('input[name=spid]').eq(0).val(),
		share:$('input[name=share]').eq(0).val(),
		name:$('input[name=name]').eq(0).val(),
		price:$('input[name=price]').eq(0).val(),
		marprice:$('input[name=marprice]').eq(0).val(),
		showpic:$('input[name=showpic]').eq(0).val(),
		keyword:$('input[name=keyword]').eq(0).val(),
		store:$('input[name=store]').eq(0).val(),
		detail:$('#detail').val()
	}
	return data;
}



//});




