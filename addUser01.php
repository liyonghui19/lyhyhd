<?php
	
	header("content-type","text/html;charset=utf-8");
	
	//一、接收前端传来的数据
	$username = $_POST["username"];
	$userpass = $_POST["userpass"];
	$userphone = $_POST["userphone"];
	
	//二、保存数据
	//1、建立连接并选择数据库
	$con = mysql_connect("localhost","root","root");
	if(!$con){
		// die("连接失败".mysql_error());
		// echo "0";	
	}else{
		mysql_select_db("yhdhy",$con);
	
	//2、执行SQL语句
	$sqlStr = "insert into userinfo(username,userpass,userphone)
              values('".$username."','".$userpass."','".$userphone."')";
	//echo $sqlStr;
	
	 $result= mysql_query($sqlStr,$con);
	
	//3、关闭数据库
	mysql_close($con);
	
	//三、给前端响应
	if($result==1){
			echo "1";
		}else{
			echo "0";
		}
	}
	

?>