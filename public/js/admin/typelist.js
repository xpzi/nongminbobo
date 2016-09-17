//addsp ===  add shangpin 商品
function AddSp(){}
AddSp.prototype.typelist;
AddSp.prototype.numlist = [0];
AddSp.prototype.getNewTypeList = function(){
	getSpType(this.setTypeList);
}
AddSp.prototype.addSelect = function( num ){	
	if( num ==  '0' ){//表示显示第一级菜单
		//alert("ddd");
		//console.log(this.typelist );
		if(!this.typelist){
			//如果typelist没有初始化 就初始化
			this.getNewTypeList();
		}else{
			$('.addspnum').remove();
			this.numlist=[0];
			//console.log(this.numlist);
			var div = setdiv( this.typelist );
		}
					
	}else{
		console.log( this.numlist );
		console.log( num );
		for(var i=this.numlist.length-1; i >= num ; i-- ){
			 $('.addspnum select[data-num='+i+']').parent().remove();			 
			 this.numlist.pop();
			 
		}
		console.log( this.numlist );
		var curr = this.typelist.data;
		for( var i =0 ; i < num ; i++){
			//console.log(this.numlist[i]-1 );
			if( i == 0){
				curr = curr[this.numlist[i]-1];
			} else if(this.numlist[i]-1 >= 0 ){
				curr = curr.child[this.numlist[i]-1];
			} else{
				return ;
			}			
			//console.log(curr);
		}		
		//if( curr.child.length > 0 ){
			this.numlist.push(0);
			var div = setdiv(curr, 'child');			
		//}
	}
	$('#addsptype').append(div);
	
	
	function setdiv( obj ,key){
		key = key || 'data';
		var div = $('<div class="addspnum col-sm-2"></div>');
			var html = '<select  data-num=' + (AddSp.prototype.numlist.length - 1) +' class="form-control">';			
			html += '<option value="0">全部</option>';
			for(var i=0 ; i < obj[key].length ; i++){
				html += '<option value="'+(i+1)+'">' + obj[key][i].name +'</option>';
			}
			html += '</select>';
			div.append($(html).change(function(){
				var i = $(this).attr('data-num');
				var newi = parseInt( $(this).val());
				//if(newi == "0" && i == '0'){
				if(newi == "0" && i == '0'){
					addSp.addSelect( 0);
				}else{	
					addSp.numlist[i] = newi;
					addSp.addSelect( parseInt(i)+1);
				}
				 //console.log( addSp.numlist );
			}));
		return div;
	}
}
AddSp.prototype.setTypeList=function(data){
	AddSp.prototype.typelist = JSON.parse( data.Data );
	AddSp.prototype.addSelect(0);
}

var addSp = new AddSp();
addSp.addSelect(0);