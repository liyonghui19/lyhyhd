$(function(){
	$(".ysame_input ").focus(function(){
		$(this).next().css({"left":"-80px"});
		$(this).parent().next().css({"opacity":1,"transform":"scale(1)","display":"block"});
	});

	$(".ysame_input").blur(function(){
		// $(this).parent().css({"border":"1px solid #ff3c3c"});
		$(".receive_code").css({"display":"block"});

	})
	 let timer=setInterval(bjlunBo,2000);
})
// ===============背景轮播=============================================================
function bjlunBo(){
	$(".r_icon1").animate({opacity: 0.3},800,function(){
		$(".r_icon2").animate({opacity: 0.3},800,function(){
			$(".r_icon3").animate({opacity: 0.3},800,function(){
				$(".r_icon4").animate({opacity: 0.3},800,function(){
					$(".r_icon5").animate({opacity: 0.3},800);
				})
			})
		})
	})
	$(".r_icon5").animate({opacity: 0.15},800,function(){
		$(".r_icon1").animate({opacity: 0.05},800,function(){
			$(".r_icon2").animate({opacity: 0.05},800,function(){
				$(".r_icon3").animate({opacity: 0.05},800,function(){
					$(".r_icon4").animate({opacity: 0.05},800);
				})
			})
		})
	})
}

// ==================正则验证======================================================================

$(function(){
	$("#userName").keyup(function(){
		let reg = /^[a-zA-Z][a-z0-9_-]{4,16}$/;
		if(reg.test(this.value)){
			$(".y_regist_right:first").css({"display":"none"});
			$(".y_regist_tips:first").css({"display":"block"});
		}
		// else{
		// 	$(".y_regist_right:first").css({"display":"none"});
		// 	$(".y_regist_tips:first").css({"display":"block"});
		// }
		$(".y_tips_words:first").html("字母开头，6-20位字符，可由中文、英文、数字或符号“_”组成");
	});
	$("#userName").blur(function(){
		let reg = /^[a-zA-Z][a-z0-9_-]{4,16}$/;
		if(reg.test(this.value)){
			$(this).parent().css({"border":"1px solid #dedede"});
			$(".y_regist_right:first").css({"display":"block"});
			$(".y_regist_tips:first").css({"display":"none"});
			//=============ajax请求=====================================================================
			$.get(
				"checkUser.php",
				{
					"username":$("#userName").val()	
				},
				function(data){
					if(data=="0"){
						$(".y_regist_right:first").css({"display":"none"});	
						$(".y_regist_tips:first").css({"display":"block"});	
						$(".y_tips_words:first").html("用户名已经被占用");
						$(".y_regist_tips:first").css({"top":"6px"});
						$(".y_regtip_rel:first").css({"background":"#fff4d7"});
						$("i:first").css({"border-right-color":"#fff4d7"});		
					}else{
						$(".y_tips_words:first").html("用户名可以使用");
						$(".y_regist_tips:first").css({"top":"6px","left":"380px"});
						$(".y_regist_tips:first").css({"display":"block"});
						$(".y_regtip_rel:first").css({"background":"#e4e4e4"});
						$("i:first").css({"border-right-color":"#e4e4e4"});	
					}
				}				
			);
			
		
		}else{
				let user = $("input[name='userName']").val();
				if(user==''){
					$(".y_tips_words:first").html("用户名不能为空");
					$(".y_regist_tips:first").css({"top":"6px"});
					$(".y_regtip_rel:first").css({"background":"#fff4d7"});
					$("i:first").css({"border-right-color":"#fff4d7"});
				}else{
					$(".y_tips_words:first").html("请输入正确用户名，用户名应为4到20位字符");
					$(".y_regtip_rel:first").css({"background":"#fff4d7"});
					$("i:first").css({"border-right-color":"#fff4d7"});
				}
				$(this).parent().css({"border":"1px solid #ff3c3c"});
		}	
	});
	$("#userName").focus(function(){
		let reg = /^[a-zA-Z][a-z0-9_-]{4,16}$/;
		if(reg.test(this.value)){
			$(this).parent().next().css({"display":"block"});
			$(".y_regist_right:first").css({"display":"none"});
		}
		let user = $("input[name='userName']").val();
		if(user==''){
			$(".y_tips_words:first").html("字母开头，6-20位字符，可由中文、英文、数字或符号“_”组成");
			$(".y_regist_tips:first").css({"top":"-4px"});
			$(".y_regtip_rel:first").css({"background":"#e4e4e4"});
			$("i:first").css({"border-right-color":"#e4e4e4"});
			$(this).parent().css({"border":"1px solid #dedede"});
		}else{
			$(".y_tips_words:first").html("字母开头，6-20位字符，可由中文、英文、数字或符号“_”组成");
			$(".y_regtip_rel:first").css({"background":"#e4e4e4"});
			$("i:first").css({"border-right-color":"#e4e4e4"});
			$(this).parent().css({"border":"1px solid #dedede"});
		}
	});
	$("#phone").keyup(function(){
		let reg =  /^1\d{10}$/;
		if(reg.test(this.value)){
			$(this).parent().next().css({"opacity":0,"transform":"scale(0)","transition":"all .5s"});
		}else{
			$(".y_tips_words:eq(1)").html("请填写正确的手机号码，以便 接收订单通知，找回密码等");
			$(".y_regist_tips:eq(1)").css({"top":"-4px"});
			$(".y_regtip_rel:eq(1)").css({"background":"#e4e4e4"});
			$("i:eq(1)").css({"border-right-color":"#e4e4e4"});
			$(this).parent().css({"border":"1px solid #dedede"});
		}
	});
	$("#phone").blur(function(){
		let reg =  /^1\d{10}$/;
		if(reg.test(this.value)){
			$(this).parent().next().css({"opacity":0,"transform":"scale(0)","transition":"all .5s"});
			$(this).parent().css({"border":"1px solid #dedede"});
			$(".y_regist_tips:eq(1)").css({"display":"none"});
		}else{
			$(".y_tips_words:eq(1)").html("格式错误，请输入正确手机号码，以便 接收订单通知，找回密码等");
			$(".y_regist_tips:eq(1)").css({"top":"6px"});
			$(".y_regtip_rel:eq(1)").css({"background":"#fff4d7"});
			$("i:eq(1)").css({"border-right-color":"#fff4d7"});
			$(this).parent().css({"border":"1px solid #ff3c3c"});
		}
	});
	$("#phone").focus(function(){
		let reg = /^1\d{10}$/;
		if(reg.test(this.value)){
			$(this).parent().next().css({"opacity":1,"transform":"scale(1)","transition":"all 1.5s"});
		}
	});
	$("#validPhoneCode").focus(function(){

		$(".y_regist_tips:eq(2)").css({"display":"block","transform":"scale(1)","opacity":1});
	});
	$("#validPhoneCode").blur(function(){
		let reg=/^\d{6}$/;
		if(reg.test(this.value)){
			
		}else{
			$(".y_regist_tips:eq(2)").css({"transition":"all 1s","transform":"scale(0)","opacity":0});
		}
	});
	$("#validPhoneCode").keyup(function(){
		let reg=/^\d{6}$/;
		if(reg.test(this.value)){
			$(".y_regist_tips:eq(2)").css({"transition":"all 1s","transform":"scale(0)","opacity":0});
		}
	});
	$("#password").keyup(function(){
		let reg = /^[a-z0-9_]{6,20}$/;
		if(reg.test(this.value)){
			$(".y_regist_right:eq(2)").css({"display":"none"});
			$(".y_regist_tips:eq(3)").css({"display":"block"});
		}
		$(".y_tips_words:eq(3)").html("亲：请正确输入密码，密码格式应为6到20个字符大小");
	});
	$("#password").blur(function(){
		let reg = /^[a-z0-9_]{6,20}$/;
		if(reg.test(this.value)){
			$(this).parent().css({"border":"1px solid #dedede"});
			$(".y_regist_right:eq(2)").css({"display":"block"});
			$(".y_regist_tips:eq(3)").css({"display":"none"});
		}else{
				$(".y_regtip_rel:eq(3)").css({"background":"#fff4d7"});
				$("i:eq(3)").css({"border-right-color":"#fff4d7"});
				$(".y_regist_tips:eq(3)").css({"top":"6px"});
				let password = $("input[name='password']").val();
				if(password==''){
					$(".y_tips_words:eq(3)").html("亲：密码不能为空！");
					
				}else{
					$(".y_tips_words:eq(3)").html("请输入正确密码,密码应为6到20位字符");
					
					}
				$(this).parent().css({"border":"1px solid #ff3c3c"});
		}	
	});
	$("#password").focus(function(){
		let reg = /^[a-z0-9_]{6,20}$/;
		if(reg.test(this.value)){
			$(this).parent().next().css({"display":"block"});
			$(".y_regist_right:eq(2)").css({"display":"none"});
		}else{
				$(".y_tips_words:eq(3)").html("亲：请正确输入密码，密码格式应为6到20个字符大小");
				$(".y_regist_tips:eq(3)").css({"top":"-4px"});
				$(".y_regtip_rel:eq(3)").css({"background":"#e4e4e4"});
				$("i:eq(3)").css({"border-right-color":"#e4e4e4"});
				$(this).parent().css({"border":"1px solid #dedede"});	
		}
	});
	$("#password2").blur(function(){
		  let pwd = $("input[name='password']").val();
		  let cpwd = $("input[name='password2']").val();
		  if(cpwd==''){
		  	$(".y_regist_right:eq(3)").css({"display":"none"});
			$(".y_regist_tips:eq(4)").css({"display":"block"});
			$(".y_tips_words:eq(4)").html("密码格式不一致");
			$(".y_regtip_rel:eq(4)").css({"background":"#fff4d7"});
			$("i:eq(4)").css({"border-right-color":"#fff4d7"});
			$(this).parent().css({"border":"1px solid #ff3c3c"});
			}else if(pwd !=cpwd&cpwd!=''){
				$(this).parent().css({"border":"1px solid #ff3c3c"});
		 	 }else{
		  		$(".y_regist_right:eq(3)").css({"display":"block"});
				$(".y_regist_tips:eq(4)").css({"display":"none"});
				$(this).parent().css({"border":"1px solid #dedede"});
		 	 }
	});
	$("#password2").keyup(function(){
		let pwd = $("input[name='password']").val();
		let cpwd = $("input[name='password2']").val();
	  	if(pwd == cpwd & cpwd !=''){
	  		$(".y_regist_right:eq(3)").css({"display":"block"});
			$(".y_regist_tips:eq(4)").css({"display":"none"});
			$(this).parent().css({"border":"1px solid #dedede"});
		}else{
			$(".y_regist_right:eq(3)").css({"display":"none"});
			$(".y_regist_tips:eq(4)").css({"display":"block"});
			$(".y_tips_words:eq(4)").html("密码格式不一致");
			$(".y_regtip_rel:eq(4)").css({"background":"#fff4d7"});
			$("i:eq(4)").css({"border-right-color":"#fff4d7"});
			$(this).parent().css({"border":"1px solid #ff3c3c"});
		}
	});
	$("#password2").focus(function(){
		let pwd = $("input[name='password']").val();
		let cpwd = $("input[name='password2']").val();
	  	if(pwd == cpwd&pwd!=''){
	  		$(".y_regist_right:eq(3)").css({"display":"none"});
	  		$(".y_tips_words:eq(4)").html("请继续输入密码");
			$(".y_regtip_rel:eq(4)").css({"background":"#e4e4e4"});
			$("i:eq(4)").css({"border-right-color":"#e4e4e4"});
			$(this).parent().css({"border":"1px solid #dedede"});
	  	}else if(pwd==''){
	  		$(".y_regist_right:eq(3)").css({"display":"none"});
	  		$(".y_tips_words:eq(4)").html("请继续输入密码");
			$(".y_regtip_rel:eq(4)").css({"background":"#e4e4e4"});
			$("i:eq(4)").css({"border-right-color":"#e4e4e4"});
			$(this).parent().css({"border":"1px solid #dedede"});
	  	}
	});
})
//==============注册请求==========================================
$(function(){		
		$("#y_agreement_btn").click(function(){
			//1、
			$.post(
				"addUser01.php",
				{
					"username":$("#userName").val(),
					"userpass":$("#password").val(),
					"userphone":$("#phone").val()
				},
				function(data){	
					if(data=="1"){
						location.href="yhdIndex.html";
					}else if(data=="0"){
						alert("亲：注册失败！请检查用户名密码.");
					}
				}
			);
		});
	});