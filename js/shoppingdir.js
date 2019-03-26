function my$(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}

// 获取cookie并加上颜色
window.onload=function(){
	let username = getCookie("usernames");
	if(username!=""){
		my$("#userSpan").innerHTML = username;
	}
}
$(function(){
	$("#userSpan").css({"color":"#ff4040"});
})
// 放大镜
function Mirror(){
	let Imgs;
	$(".mBox").on("mouseenter","li",function(){
		$(this).children().css({"border":"1px solid red"});
		$(this).siblings().children().css({"border":"1px solid #fff"});
		Imgs=$(this).children("img").attr("src");
		$(".proImg").children("img").attr({src:Imgs});
		$("#J_zoom").children("img").attr("src",Imgs);
	});
	$(".proImg").mousemove(function(e){
		//一、数据处理
		//1、改变数据（放大镜子的left和top）		
		let left1 =  e.pageX-$(this).offset().left-$(".zoomCursor").width()/2;
		let top1 =  e.pageY-$(this).offset().top-$(".zoomCursor").height()/2;
		
		//2.边界处理
		if(left1<0){
			left1=0;
		}else if(left1>$(this).width()-$(".zoomCursor").width()){
			left1=$(this).width()-$(".zoomCursor").width();
		}

		if(top1<0){
			top1=0;
		}else if(top1>$(this).height()-$(".zoomCursor").height()){
			top1=$(this).height()-$(".zoomCursor").height();
		}

		//二外观呈现
		$(".zoomCursor").css({"left":left1,"top":top1});
		// $(".c_m_yingcang").css({"background-position":`${-1*2.5*left1}px ${-1*2.5*top1}px`})
		$("#J_zoom").children("img").css({"left":`${-1*3*left1}px`,"top":`${-1*3*top1}px`})
	})
	$(".proImg").mouseenter(function(){
		$(".zoomCursor").css("display","block");
		$("#J_zoom").css("display","block");
		if(Imgs==undefined){
			Imgs=$(".proImg").children("img").attr("src")
		}
		$("#J_zoom").children("img").attr("src",Imgs);
	})
	$(".proImg").mouseleave(function(){
		$(".zoomCursor").css("display","none");
		$("#J_zoom").css("display","none");
	})
}

// 动态改变商品
function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
	 
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
}
$(function(){
	let goodsid = getUrlParam("goodsId");
	let datas = null;
	$.ajax({
		type:"GET",
		url:"getGoodsInfo.php",
		dataType:"JSON",
		data:{"goodsId":goodsid},
		success:function(data){
			datas = data;
			showgoodsDetail(data);
			Mirror();
			deleteLi();
			changeCount();

			}	
		});

		function showgoodsDetail(obj){
			let htmlStr = "";
			htmlStr +=`
		<div class="mod_detail_crumb clearfix">
			<div class="crumb clearfix">
				<a href="javascript:;">
					<em>手机通讯</em>
					<i class="iconfont icon-arr-right"></i>
				</a>
				<a href="javascript:;">
					<em>手机</em>
					<i class="iconfont icon-arr-right"></i>
				</a>
				<a href="javascript:;">
					<em>手机</em>
					<i class="iconfont icon-arr-right"></i>
				</a>
				<a href="javascript:;">
					<em>华为（HUAWEI）</em>
					<i class="iconfont icon-arr-right"></i>
				</a>
				<span>
					<em title="${obj.goodsName}">${obj.goodsName}</em>
				</span>
			</div>
		</div>
		<div class="fm_detail_one clearfix">
			<!-- 左侧主图区域 -->
			<div class="l">
				<div class="mod_detail_preview clearfix">
					<!-- 大图 -->
					<div class="proImg_border">
						<div class="proImg">
							<img src="${obj.goodsImg}">
							<div class="zoomCursor"></div>
							<div class="mask"></div>
						</div>
					</div>
					<div class="proCrumb clearfix">
						<a href="javascript:;" class="cBtn prev">
							<i class="iconfont icon-next-copy"></i>
						</a>
						<div class="hideBox">
							<ul class="mBox clearfix">
								<li>
									<img src="${obj.beiyong1}" alt="" width=50 height=50 style="border:1px solid red">
								</li>
								<li>
									<img src="${obj.beiyong2}" alt="" width=50 height=50>
								</li>
								<li>
									<img src="${obj.beiyong3}" alt="" width=50 height=50>
								</li>
								<li>
									<img src="${obj.beiyong4}" alt="" width=50 height=50>
								</li>
								<li>
									<img src="${obj.beiyong5}" alt="" width=50 height=50>
								</li>
							</ul>
						</div>
						<a href="javascript:;" class="cBtn next">
							<i class="iconfont icon-arr-right"></i>
						</a>
					</div>
					<div class="J_zoom" id="J_zoom">
						<img src="${obj.goodsImg}" alt="">
					</div>
				</div>
				<div class="product_rel clearfix">
					<div class="prod_l">
						<p class="product_id" id="pro_code">
							<span>商品编号</span>
							${obj.goodsId}
						</p>
						<p class="collect">	
							<i class="iconfont icon-mogujie"></i>
							关注
						</p>
					</div>
				</div>	
			</div>
			<div class="main_content">
				<div class="detail_information">
					<div class="mod_detailInfo_proName">
						<h1 class="mh" id="productMainName" title="${obj.goodsDesc}">
							<span class="self_icon">自营</span>
							${obj.goodsDesc}
						</h1> 
					</div>
					<div class="mod_detailInfo_priceSales">
						<div class="price pb0">
							<ul class="clearfix">
								<li class="tag">价格</li>
								<li class="number inte_check">
									<span id="current_price">¥${obj.goodsPrice}</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="mod_cuputing clearfix">
						<div class="clearfix">
							<div class="computing_item">
								<div class="computing_num">
									<input type="button" class="reduce" value="-">
									<input type="text" class="num" value="${obj.goodsCount}">
									<input type="button" class="add" value="+">
								</div>
							</div>
							<div class="cartbox">
								<a href="javascript:;" class="buy_btn6 btn_init_class">
									<span>加入购物车</span>
								</a>
								<a href="shoppingcart.html" class="buy_btn13 btn_init_class">
									<span>立即购买</span>
								</a>
								<a href="javascript:;" class="link J_priceNotice">降价通知</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`
			$(".detail_wrap").html(htmlStr);
		}	
    })
// 删除图片路径为空的li
function deleteLi(){
	$(".detail_wrap").mouseenter(function(){
		$(".mBox li").each(function(){
			let nulls=$(this).children("img").attr('src');
			if(nulls==''){
				$(this).remove();
			}
		})
	})
}
// 加号减号绑定事件
function changeCount(){
	let count = $(".num").val();
	$(".add").click(function(){
		count++;
		$(".num").val(count)
		if(count>0){
				$(this).prev().prev().css({"color":"#333"});
			}
	})
	$(".reduce").click(function(){ 
			count--;
			if(count<=0){
				count=0;
				$(this).css({"color":"#999"});
			}
			$(".num").val(count);
		})
}
// 加入购物车
$(function(){
	$(".btn_init_class").live("click",function(){
		let nums=$(".num").val();
		let goodsid = getUrlParam("goodsId");
		let username = getCookie("usernames");
		$.ajax({
			type:"GET",
			url:"addShoppingCart.php",
			dataType:"JSON",
			data:{"vipName":username,"goodsId":goodsid,"goodsCount":nums},
			success:function(data){
				if(data==1){
					alert("已成功添加购物车");
					console.log("添加成功");
				}else{
					console.log("添加失败");
				}
			}
		})
		// $.get("addShoppingCart.php",{"vipName":username,"goodsId":goodsid,"goodsCount":nums})
	})
})

