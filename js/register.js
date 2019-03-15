$(function(){
	$(".ysame_input ").focus(function(){
		$(this).next().css({"left":"-80px"});
		$(this).parent().next().css({"opacity":1,"transform":"scale(1)","display":"block"});
		$(this).parent().next()
	});

	$(".ysame_input").blur(function(){
		$(this).parent().css({"border":"1px solid #ff3c3c"});
		$(this).parent().next().css({"display":"none"});
		$(".receive_code").css({"display":"block"});
	})
})