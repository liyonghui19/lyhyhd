
// 窗口打开自动聚焦
$(document).ready(function(){
	$("#username").focus();	
	$("#username").val("");
})

$(function(){
	$(".unfold").click(function(){
		$(".more_landing").toggle();
	})
	$(".uncheck_agreement").click(function(){
		$(".auto_tips").toggle();
		$(this).toggleClass("check_agreement");
		$(this).toggleClass("uncheck_agreement");
	})
	$(":input").focus(function(){
		$(this).parent().addClass("cur");
		$(this).parent().css({"border":"1px solid #aaa"});
	});
	$(":input").blur(function(){
		$(this).parent().removeClass("cur");
		$(this).parent().css({"border":"1px solid #e0e0e0"});
	});
	$("#username").mouseenter(function(){
		$(this).focus();
	})
	 $("#username").focus(function(){
        if($(this).val()==this.defaultValue){
            $(this).val("");
        }
    });
	 $("#username").mouseenter(function(){
	 	if($(this).val()==""){
	 		$(this).removeClass("gay_text");
	 	}
	 })

    $("#username").mouseleave(function(){
        if($(this).val()==""){
            $(this).val(this.defaultValue);
            $(this).addClass("gay_text");
        }
    });
	
})
//=======================发送php请求====================================
$(function(){		
		$("#btnLogin").click(function(){
			//1、
			$.post(
				"login.php",
				{
					"username":$("#username").val(),
					"userpass":$("#userpass").val()
				},
				function(data){					
					if(data=="1"){//登录成功！
						//记录cookie
						saveCookie("usernames",$("#username").val(),7);
						location.href="yhdIndex.html";
					}else if(data=="0"){
						alert("登录失败，用户名或者密码不对！");
					}
				}
			);
		});
	});

