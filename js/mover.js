//匀速运动：
//参数：
	//dom对象
	//样式属性
	//起始值
	//结束值
	//方向
	//步长
	//时间间隔
//返回值：无
function moveYun(domObj,styleAttr,startValue,endValue,direction,step,timeSpace){
	var value=startValue;
	var myTimer=setInterval(function(){
		// 数据处理
		value+=direction*step;
		// 边界
		// if(value>=endValue){
		if(direction>0?value>=endValue:value<=endValue){
			value=endValue;
			clearInterval(myTimer);
		}
		// 改变外观
		if(styleAttr=="opacity"){
			domObj.style[styleAttr]=value;
		}else{
			domObj.style[styleAttr]=value+"px";
		}
		
	},timeSpace)
}

//匀速运动：
//参数：
	//dom对象
	//样式属性
	//结束值
	//时长
//返回值：无
function moveYun2(domObj,styleAttr,endValue,timeLong){
	var startValue= parseInt(getStyle(domObj,styleAttr));
	var direction= endValue>startValue? 1:-1;
	//已知：时长，距离（Math.abs(startValue-endValue)）
	var timeSpace=10;
	var step=Math.abs(startValue-endValue)/(timeLong/timeSpace)//(步长= 距离/总步数;  总步数 = 时长/时间间隔)
	moveYun(domObj,styleAttr,startValue,endValue,direction,step,timeSpace);
}

//完成两张图片的滑入滑出
//参数:
//出去的图片
//进来的图片
//样式属性
//结束值(以出去的图片准)
//两张图片的距离差。
//时长

//思路：以出去的图片为准进行运动，即运动中的任何数据都是以出去的图片为准

function slideInOut(domObjOut,styleAttr,endValue,timeLong,domObjIn,diff,func){
	var startValue=parseInt(getStyle(domObj,styleAttr));

	var direction = startValue>endValue?-1:1;

	//已知：时长，距离（Math.abs(startValue-endValue)）
	var timeSpace =  10;
	var step =Math.abs(startValue-endValue)/(timeLong/timeSpace) ;//(步长= 距离/总步数;  总步数 = 时长/时间间隔)

	var value = startValue;

	var myTimer = setInterval(function(){
		//一、数据处理
		//1、改变数据
		value = value+direction*step;
		
		//2、边界
		//if(value>=endValue){
		if(direction>0?value>=endValue:value<=endValue){
			value = endValue;
			window.clearInterval(myTimer);
			func&&func();
		}

		//二、改变外观
		domObjOut.style[styleAttr] = value+"px";
		domObjIn.style[styleAttr] = (value+diff)+"px";
		
	},timeSpace);
}