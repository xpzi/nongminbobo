//ajax get请求 和 post请求
function ajaxGet(src , fn){
	var xhr;
	if( window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	} else{
		xhr = ActiveXObject("Maricsofot.XMLHTTP");
	}		
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200 ){
				if(fn){					
					fn( JSON.parse(xhr.responseText ) );
				}									
			}
		}
	}
	xhr.open("GET", src , true);		
	xhr.send();
}
function ajaxPost(url , data , callback ){		
	var ajax = new XMLHttpRequest();		
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4){
			if(ajax.status == 200){					
				callback(  JSON.parse(ajax.responseText) );						
			}				
		}			
	}	
	ajax.open("POST" , url, true);
	ajax.setRequestHeader("Content-type" , "application/x-www-form-urlencoded");
	ajax.send( data);			
}

//get 商品数量信息  和 分类商品信息 //get 分类商品信息
function getSpNum(callback){
	var dange= 'http://localhost:8080/product/GetProductById_get?id=000';
	ajaxGet(dange, callback);
}
function getSpType(callback){
	var dange= 'http://localhost:8080/product/GetProductById_get?id=000';
	ajaxGet(dange, callback);
}
//get  getSpList 获取商品列表(分页); getSpOnce 获取单个商品 
function getSpList(callback, size , index){
	//size  必须能被20整除
	var size = size || '10';
	var index = index || '3';
	var fenye = "http://localhost:8080/product/GetProductsByPage_get?pagesize="+size+"&pageindex="+index;
	ajaxGet(fenye, callback);
}
function getSpOnce(id, callback){
	var dange= 'http://localhost:8080/product/GetProductById_get?id='+id;
	ajaxGet(dange, callback);
	
}
//post save new data
function saveData(id , data, callback){
	var tianjia = 'http://localhost:8080/product/CreateUpdateProduct_post?';
	var src='id='+id +"&datajson="+ JSON.stringify( data );
	ajaxPost(tianjia , src ,callback)
}
//get del old data
function delData(id, callback){
	var del = "http://localhost:8080/product/DeleteProductById_get?id=";
	console.log( del+id );
	ajaxGet(del+id , callback);
}



/*******     用户相关        ************** */
//传入用户名 就可以了  有户名验证
function userNameCheck( name, callback , obj){
	var userCheck =  'http://localhost:8080/user/CheckUserNameGet?username=';
	if(obj){
		ajaxGet(userCheck+name , function(data){
			callback(data , obj);
		});
	}else{
		ajaxGet(userCheck+name , callback );
	}
	
}
// 获取 全部 用户列表
function getUserList(callback){
	var userList =  'http://localhost:8080/api/Users';
	ajaxGet(userList, callback );
}
//验证用户名和密码 用户登录验证
function userLoginCheck(name , pass, callback){
	//console.log(name , pass , callback);
	var login = "http://localhost:8080/user/loginGet?";
	ajaxGet(login+"name="+name+"&password="+pass, callback);
}
//用户注册地址
function userRegister(user , callback){
	var user = user;
	getUserList(function(data){
		console.log( data );
		var len = data.length;
		user.Id = len;
		var zhuce =  'http://localhost:8080/user/registerGet?';
		var data = "";
		for( var k in user){
			data +=  k +"="+user[k] +"&";
		};
		data = data.substring(0, data.length - 1);
		console.log( zhuce+ data );
		ajaxGet(zhuce+data, callback );
	});

}
 




/*****  商品相关  方法   *********  */
//我还是从新写把，然后过滤掉就好
//000	 用于保存    商品id用到哪里了， 用于商品id自增长   	保存店家的所有信息  保存商品分类信息和分类信息
//001   user		保存所有用户的信息 
//002   dianjia
//003 - 0009		预留id


//添加商品的函数 -- 以后就 只用这个函数 即使有别的方法可以代替
//添加商品的函数 
//data 对象数据
//fn   回调函数
//  同时实现修改功能
function addSpPost( data, typelist, callback){
	//1.获取当前已添加的商品数量获得，商品id
	getSpNum( callgetSpNum );
	
	//获取到 商品总数 实现id自增长的回调函数
	function callgetSpNum(cbdata){
		var cbdd = JSON.parse( cbdata.Data );
		//cbdd.spnum = 1;
		if( data.Id == 'new'  ){
			cbdd.spnum = parseInt( cbdd.spnum )+1;
			var current = cbdd;
			//console.log(typelist );
			for(var i=0 ; i < typelist.length ; i++ ){
				//console.log( current );
				if( i == 0 ){
					current = current.data[typelist[i]-1];
				} else{
					current = current.child[typelist[i]-1];
				}			
			}
			current.splist.push( cbdd.spnum );
			//保存商品总数
			saveData('000' , cbdd ,function(){
				//保存商品
				data.Id = cbdd.spnum;
				data.Type = typelist;
				
				console.log( data.Id );
				//console.log( data) ;
				//console.log( callback );		
				saveData(data.Id , data, callback );
			});		
		} else{
			saveData(data.Id , data, callback );
		}
		
	}
}
function delSpGet(spid , callback){
	getSpOnce(spid , function(sp){
		var sp = JSON.parse(sp.Data);
		//var typelist = sp.type;
		getSpNum(function(data){
			var data = JSON.parse(data.Data);
			var cur= data;
			for(var i =0 ; i < sp.Type.length ; i++){
				if( i == 0){
					cur = cur[sp.Type[i] -1];
				} else{
					cur = cur.child[sp.Type[i] -1 ];
				}
			}
			for(var i = 0 ; i < cur.splist.length ; i++){
				if( cur.splist[i] == spid ){
					cur.splist.splice(i , 1);
					break;
				}
			}
			saveData("000" , data , function(){
				delData(spid , callback);
			});			
		});
		
	});
}


//添加分类
//name 新增分类名称 ， 
//parsenid 父级分类id 数组 
//callback  回调函数
function addType( name ,parsenid , callback){
	getSpNum(addcallback);
	function addcallback(data){
		if(data == null ){
			//初始化000 商品数量信息  和 分类商品信息
			data = {
				Id : "000",
				Data : {
					spnum : 0,
					typenum : 1,
					data: [{
						id:1,
						name: name,
						splist: [],
						child: []
					}]
				}
			}
		}else{
			var Data = JSON.parse( data.Data );
			Data.typenum =  parseInt(Data.typenum ) + 1;
			var child = {
				id:Data.typenum,
				name:name,
				splist:[],
				child:[]
			}
			
			if( !parsenid ||  parsenid=="0"){
				//父亲id不存在 或者0表示顶级分类				
				Data.data.push(child);
			}else{
				//parsenid 是个数组   存放i父级id  如  [1 , 9 ] //表示该分类添加到 id为1的分类下 id为9的分类的子分类
				var current = Data.data;
				for(var i = 0 ; i<parsenid.length ; i++ ){
					console.log( current);
					if( i== 0 ){
						current = current[ parsenid[i] -1 ];
					} else{
						current = current.child[ parsenid[i] -1 ];
					}
					
				}
				current.child.push( child );
			}
			data.Data = Data;
		}		
		//保存 新数据
		saveData(data.Id , data.Data, callback);		
	}
}
//修改分类
function modifyType(){}




/*  扩展  时间对象 */
//计算两个时间的差   反回对象
Date.prototype.datePoor = function (date){
    var num = date.getTime() - this.getTime();  //计算两个时间的差
    var d = Math.floor( num / (1000*60*60*24));             //计算出天数
    num = num %(1000*60*60*24);
    var h = Math.floor( num / (1000*60*60));                //计算出小时
    num = num%(1000*60*60);
    var m = Math.floor(num/(1000*60));                      //计算出分钟
    num = num%(1000*60);
    var s = Math.floor(num /1000);                          //计算出秒数
    return {
        day:d,
        hours:h,
        minute:m,
        second:s
    };
}





/*//get方法更新数据
function myAjaxGet(src , fn, type, id){
	var dange= 'http://localhost:8080/product/GetProductById_get?id=';
	var tianjia = 'http://localhost:8080/product/CreateUpdateProduct_get?';
	var type = type || 'sp' ;
	console.log( type );
	ajaxGet(src , upData);
	//ajaxGet(dange+'000' , spFn1);
	//添加记录
	function  addRecord(data){
		//判断data有没有 没有就 如下
		console.log(data);
		//console.log( typeof data );
		if( data == null ){
			//如果没有数据 ， 则添加
			data = {
				Id:"000",
				Data :{}				
			}
			data.Data[type] = {
				sum:1,
				data:[id]
			};
		}
		//看看对应的类型有没有初始化
		else{			
			
			data.Data = JSON.parse( data.Data );
			//data.Data = JSON.parse( data.Data );
			console.log(data.Data  );
			if(typeof data.Data[type]  == 'undefined' ){
				//如果没有初始化
				data.Data[type] = {
					sum:1,
					data:[id]
				};
			} else{
				//如果有则加一
				data.Data[type].sum = parseInt(data.Data[type].sum) + 1;
				data.Data[type].data.push(id);
			}
		}
		console.log(data );
		//这里是更新 总记录
		ajaxGet(tianjia+"id=" + data.Id + "&datajson=" + JSON.stringify( data.Data ) , upRecord);
		
	}
	
	//原来的数据更新的回调函数
	function upData(data){
		if( data == '1'){
			ajaxGet(dange+'000' , addRecord);
		} else{
			fn(data);
		}		
	}
	
	//000更新的回调函数
	function  upRecord(data){
		if(data == '1' ){
			fn(data);
		}else{
			fn( "1" );
		}
	}
	
}*/