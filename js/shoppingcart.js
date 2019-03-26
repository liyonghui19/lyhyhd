
// 显示购物车
$(function(){
	// 添加cookie
	let username = getCookie("usernames");
	// let data = null;
	if(username!=""){
		$("#userSpan").html(username);
	}
	// 调用购物车函数
	$.ajax({
		type:"GET",
		url:"getShoppingCart.php",
		dataType:"JSON",
		data:{"vipName":username},
		success:function(datas){
			console.log(datas);
			showShopingCart(datas);
			onePrice();
			changeCount();
			totalCount();
			totalMoney();
		}
	})

})
// 展示商品
function showShopingCart(obj){
	let htmlStr='';
	for(let i in obj){
		datas=obj[i];
		htmlStr+=`<div class="cart_list">
					<div class="cart_tit clearfix">
						<span class="checkbox">
							<a href="javascript:;" class="check checked check_list">
								<i class="iconfont icon-duigou"></i>
							</a>
						</span>
						<a href="javascript:;" class="label vender">艾夫人家居拼购旗舰店</a>
						<a href="javascript:;" class="service"></a>
					</div>
					<div class="cart_list_wrap">
						<ul class="cart_item">
							<li class="item item_line main_item clearfix">
								<div class="cart_prod clearfix">
									<a href="javascript:;" class="check checked check_item">
										<i class="iconfont icon-duigou"></i>
									</a>
									<a href="javascript" class="item_pic">
										<img src="${datas.goodsImg}" alt="" width=75 height=75>
									</a>
									<a href="javascript:;" class="item_tit ">${datas.goodsDesc}</a>
									<div class="item_price">
										<p>${datas.goodsPrice}</p>
									</div>
									<div class="item_num">
										<div class="num_act clearfix">
											<a href="javascript:;" class="minus">-</a>
											<input type="text" class="input" value="${datas.goodsCount}">
											<a href="javascript:;" class="add">+</a>
										</div>
									</div>
									<div class="item_money"></div>
									<div class="item_act">
										<a href="javascript:;">
											<i class="iconfont icon-xin"></i>
										</a>
										<a href="javascript:;" class="deleteGoods">
											<i class="iconfont icon-lajitongshanchu"></i>
										</a>
										<span style="display:none">${datas.goodsId}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="cart_amount">
						<div class="amount">
							商品总价：
							<span>
								<em>￥</em>
								19.9
							</span>
						</div>
					</div>
				</div>`;
	}
	$("#cartlist_box").html(htmlStr);	
}
// 小计计算
function onePrice(){
	let length = $(".cart_list").length;
	for(let i=0;i<length;i++){
		let total=0;
		let  count =Number($('.input').eq(i).val());
		let price = Number($('.item_price').eq(i).children('p').html());
		 total = count*price;
		$(".item_money").eq(i).html(total);
		$(".amount").eq(i).children('span').html(total);
	}
	
}
// 删除购物车中的商品
$(".deleteGoods").live("click",function(){
	let username = getCookie("usernames");
	let goodsid = $(this).next('span').html();
	$(this).parentsUntil('#cartlist_box').remove();
	$.get("deleteGoods.php",{"vipName":username,"goodsId":goodsid},function(data){
		if(data==1){
			alert('删除成功');
			totalCount();
			totalMoney();
		}else if(data==0){
			alert("删除失败");
		}
	})
})
// 购物车界面修改
function changeCount(){
	let username = getCookie("usernames");
	$(".add").click(function(){
		let count = Number($(this).prev().val());
		let goodsid=$(this).parent().parent().next().next().children('span').html();
		let price = Number($(this).parent().parent().prev().children('p').html());
		let totals=price*count;
		count++;
		totals=totals+price;
		$(this).parent().parent().next().html(totals);
		$(this).parentsUntil(".cart_list").next(".cart_amount").children().children('span').html(totals);
		$(this).prev().val(count);
		if(count>0){
				$(this).prev().prev().css({"color":"#333"});
			}
		$.get("updateGoodsCount.php",{"goodsCount":count,"vipName":username,"goodsId":goodsid},function(data){
			if(data==1){
				console.log("+");
				totalCount();
				totalMoney();
			}
		})
	})
	$(".minus").click(function(){
		let count = Number($(this).next().val());
		let goodsid=$(this).parent().parent().next().next().children('span').html();
		let price = Number($(this).parent().parent().prev().children('p').html());
		let totals=price*count;
		count--;
		totals=totals-price;
		if(count<=0){
			count=0;
			$(this).css({"color":"#999"});
		}
		$(this).parent().parent().next().html(totals);
		$(this).parentsUntil(".cart_list").next(".cart_amount").children().children('span').html(totals);
		$(this).next().val(count);
		$.get("updateGoodsCount.php",{"goodsCount":count,"vipName":username,"goodsId":goodsid},function(data){
			if(data==1){
				console.log("-");
				totalCount();
				totalMoney();
			}
		})
	})
}
// 总件数的计算
function totalCount(){
	let totalCount=0;
	$(".input").each(function(){
		let s= Number($(this).val());
		totalCount+=s;
	})
	$(".all_checked_label b").html(totalCount);
}
// 总价的计算
function totalMoney(){
	let totalMoney=0;
	$(".cart_amount").each(function(){
		let num=Number($(this).children().children('span').html());
		totalMoney=totalMoney+num;
	})
	$("#totalMoney").html(totalMoney);
}
// 全选反选按钮的点击事件
$(function(){
	$('.check_all').live('click',function(){
		$('.check').each(function(){
			$(this).toggleClass('checked');
		})
	})
	$('.check_item').live('click',function(){
		$(this).toggleClass('checked');
	})
})
