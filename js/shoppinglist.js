

//=========手机通讯，手机的二级菜单
$(function(){
	$(".crumb_list").mouseenter(function(){
		$(this).children().eq(1).css({"display":"block"});
	})
	$(".crumb_list").mouseleave(function(){
		$(this).children().eq(1).css({"display":"none"});
	})
	// 添加cookie
	let username = getCookie("usernames");
	if(username!=""){
		$("#userSpan").html(username);
	}
})
//品牌部分点击事件
function showAll(){ 
	$(".guide_switch").css({"display":"block"});
	$(".guide_lists").css({"height":161});
	$(".guide_btn").css({"display":"block"});
}
function hideAll(){
	$(".guide_switch").css({"display":"none"});
	$(".guide_lists").css({"height":107});
	$(".guide_btn").css({"display":"none"});
}

$(function(){
	$(".guide_switch").on("click","span",function(){
		$(this).addClass('cur');
		$(this).siblings().removeClass("cur");
	})

	// 多选和更多点击事件
	$(".guide_more_choice").click(function(){
		$(this).css({"display":"none"});
		$(this).next().css({"display":"none"});
		$(".none").css({"display":"block"});
		$(".guide_con").addClass("show_all");
		showAll();
	});
	$(".guide_more_open").click(function(){
		$(this).css({"display":"none"});
		$(this).prev().css({"display":"none"});
		$(".none").css({"display":"block"});
		$(".guide_con").addClass("show_all");
		showAll();
	});
	$(".none").click(function(){ 
		$(this).css({"display":"none"});
		$(this).siblings().css({"display":"block"});
		$(".guide_con").removeClass("show_all");
		hideAll();
	})
	$("#brandMutiCancel").click(function(){ 
		$(".none").css({"display":"none"}); 
		$(".none").siblings().css({"display":"block"});
		$(".guide_con").removeClass("show_all");
		hideAll();
	});
	$(".mod_search_guide .guide_con a u").toggle(
		function(){
			$(this).parent().addClass("cur");
		},function(){
			$(this).parent().removeClass("cur");
		});
	
	// 系统点击事件
	$(".more_choice").click(function(){
		$(this).parent().css({"display":"none"});
		$(this).parent().prev().children(".moultiple_con_btn").css({"display":"block"});
		$(this).parent().prev().addClass("guide_main_cur");
	})	
	$(".cancel").click(function(){
		$(this).parent().parent().next().css({"display":"block"});
		$(this).parent().css({"display":"none"});
		$(this).parent().parent().removeClass("guide_main_cur");
	})

	// 更多筛选项
	$(".m_b").mouseenter(function(){
		$(this).addClass("cur");
	})
	$(".m_b").mouseleave(function(){
		$(this).removeClass("cur");
	})
})
// 获取商品列表
$(function(){
  // 用get获取数据
  $.get(
    "getGoodsList.php",
    showDate,
    "json"
    )
// 回调函数----页面显示
})
 function showDate(obj){
    var htmlStr = "";
    for (let i in obj){
      data = obj[i];
      // console.log(data);
      // console.log(data.goodsImg+data.goodsName+data.goodsPrice+data.goodsDesc);    
        htmlStr += `<div class="mod_search_pro" id="${data.goodsId}">
								<div class="itemBox">
									<div class="proImg" id="searchProImg">
										<a href="shoppingdir.html?goodsId=${data.goodsId}" class="img" style="position: relative;">
											<img src="${data.goodsImg}" alt="">
										</a>
									</div>
								</div>
								<p class="proPrice">
									<em class="num">
										<b>￥</b>
										${data.goodsPrice}
									</em>
									<span class="unit_price"></span>
								</p>
								<p class="proName clearfix">
									<a href="javascript" class="mainTitle" title="${data.goodsDesc}">
										${data.goodsDesc}
								</p>
								<div class="item_act clearfix">
									<a href="javascript:;" class="buy_btn">查看详情</a>
								</div>
							</div>`;
    }
     document.getElementById("itemSearchlist").innerHTML = htmlStr;
  }

