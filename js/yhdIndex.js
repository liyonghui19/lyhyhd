function my$(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}


var myTimer=null;
var currIndex=0;
// 自动播放
function autoPlay(){
	if(myTimer!=null){
		return;
	}
	myTimer=setInterval(function(){
		let outIndex = currIndex;
		currIndex++;
		if(currIndex>=3){
			currIndex=0;
		}
		// 呈现外观
		showImg(outIndex,currIndex);	
	},2000)
}	
// 停止播放
function stopPlay(){
	clearInterval(myTimer);
	myTimer=null;
}
// 滑过菜单跳到对应图片
function goImg(index){
	let outIndex = currIndex;
	currIndex=index;
	if(currIndex>=3){
		currIndex=0;
	}
	// 呈现外观	
	showImg(outIndex,currIndex);	
}

function showImg(outOrd,inOrd){
	if(outOrd==inOrd){
		return;
	}
	// 外观呈现
	let lunboLis=my$(".lunbo_li");
	for(let i=0;i<lunboLis.length;i++){
		lunboLis[i].style.zIndex=-1;
		// lunboLis[i].style.display="none";
		lunboLis[i].style.position="absolute";
		// lunboLis[i].style.opacity=0;
	}
	lunboLis[currIndex].style.zIndex=0;
	// lunboLis[currIndex].style.display="list-item";
	// lunboLis[currIndex].style.opacity=1;
	// 1.改图片
	let imgDoms=my$(".lunbo_li_img");
	moveYun2(imgDoms[outOrd],"opacity",0,1000);
	moveYun2(imgDoms[inOrd],"opacity",1,1000);
	// 2.改菜单
	let liDoms=my$("#lb_tab_list").children;
	for(let i=0;i<liDoms.length;i++){
		liDoms[i].style.background="#fff";
		liDoms[i].style.color="#333";
		liDoms[i].style.zIndex=2;
	}
	liDoms[currIndex].style.background="#333";
	liDoms[currIndex].style.color="red";
}


	// 倒计时
function countTime() {  
    //获取当前时间  
    var date = new Date();  
    var now = date.getTime();  
    //设置截止时间  
    var str="2019/3/20 00:00:00";
    var endDate = new Date(str); 
    var end = endDate.getTime();  
    
    //时间差  
    var leftTime = end-now; 
    //定义变量 d,h,m,s保存倒计时的时间  
    var h,m,s;  
    if (leftTime>=0) {  
        // d = Math.floor(leftTime/1000/60/60/24);  
        h = Math.floor(leftTime/1000/60/60%24);  
        m = Math.floor(leftTime/1000/60%60);  
        s = Math.floor(leftTime/1000%60);                     
    }  
    //将倒计时赋值到div中 

    // document.getElementById("_d").innerHTML = d+"天";  
    my$("#time_hour").innerHTML = h<10? "0"+h:h;  
    my$("#time_minute").innerHTML = m<10? "0"+m:m;  
    my$("#time_second").innerHTML = s<10? "0"+s:s;  
    //递归每秒调用countTime方法，显示动态时间效果 setTimeout(countTime,1000);
} 

window.onload=function(){
	autoPlay();
	// 2.鼠标进入暂停
	my$("#lunboTu").onmouseover=function(){
		stopPlay();
	}
	// 3.鼠标离开继续
	my$("#lunboTu").onmouseout=function(){
		autoPlay();
	}
	// 4.鼠标进入菜单调到对应图片
	my$("#lb_tab_list").onmouseover=function(event){
		stopPlay();
		let evt=event||window.event;
		if(evt.target.tagName.toLowerCase()=="li"){
			goImg(evt.target.getAttribute("index"));
			evt.stopPropagation();
		}
	}

	// 调用倒计时	
	setInterval(countTime,1000);
}


	// 右边固定定位
window.onscroll=function(){
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	if(scrollTop<=700){
		my$("#fix_scan").style.position="absolute";
		my$("#fix_scan").style.top=0+"px";
	}else{
		my$("#fix_scan").style.position="fixed";
		my$("#fix_scan").style.top=156+"px";
	}
}


	// 回到顶部
var timer = null;
my$("#jump_top").onclick = function(){
	cancelAnimationFrame(timer);
	timer = requestAnimationFrame(function fn(){
		var oTop = document.body.scrollTop || document.documentElement.scrollTop;
		if(oTop > 0){
			scrollBy(0,-40);
			timer = requestAnimationFrame(fn);
		}else{
			cancelAnimationFrame(timer);
		} 
	});
}


// jquery代码
$(function(){
	$(window).on('scroll',function(){
		topNavScroll();
	});

})
 function topNavScroll(){
            //获取当前窗口滚动条顶部所在的像素值 并取整
            var topScroll = Math.floor($(window).scrollTop());
            //设置滚动多少像素后透明度变为1
            var scrollDist = 700;
            var scrollTops = 2000;
            //定义滚动条在向下滚动180像素后 变成完全不透明
            if(topScroll <= scrollDist){
              //通过浏览器标题栏显示并检查数据
              //document.title = topScroll + '-' + opacity;
              //计算当前透明度 当前所在的像素 除 180(topScroll的最大值 因为透明度的值是0-1之间的小数)
                $('.hd_search_fixed').css({"position":"relative","display":"none"});
            }
            else{
                $('.hd_search_fixed').css({"position":"fixed","top":0,"display":"block"});
            }
			if(topScroll<=scrollTops){
				$('#jump_top').css({"display":"none"});
			}
			else{
				$('#jump_top').css({"display":"block"});
			}
        }
