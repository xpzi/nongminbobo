$(document).ready(function(){
	
	var login = adminCookie.get();
	console.log( login );
	if(false ){ //!login  ){		
		window.location.href="login.html";  
	} else{
//		login = JSON.parse( login);
//		console.log( login.name);
//		$('#adminname').html("欢迎回来，亲爱的"+ login.name);
		
		
		$('.tuichu').click(function(){
			adminCookie.remove();	
			window.location.href="login.html";  
		});

		$(".htmlLink").load('../public/html/link.html');
		$('.content').load('addsp.html');
	
		
		$(".leftbox li>a").click(function(){
			$(".leftbox li>div").slideUp();
			$(this).parent().find("div").slideDown();
		});
		
		$('.leftbox li>a').eq(0).trigger("click");
		
		$('.haizi a').click(function(){
			window.mydata = null;
			$('.content').load( $(this).attr('href') );
			return false;
		});
		
	}
	
});


