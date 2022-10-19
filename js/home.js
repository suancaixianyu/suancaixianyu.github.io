function userAgent() {
	if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  	// 当前设备是移动设备
	var url = "https://suancaixianyu.github.io/home.html";    
	$(location).attr('href',url);
	}
}

function home() {
	// 主页
	$("#Random_picture").hide();
	$("#Random_picture_ex").hide();
	$("#PID").hide();
	$("#home").show();
	$('.list').css('background-color','rgb(230,230,230)');
	$('#homebut').css('background-color','rgb(250,250,250)');
}

function Random_picture() {
	// 随机图片
	$("#home").hide();
	$("#PID").hide();
	$("#Random_picture_ex").hide();
	$("#Random_picture").show();
	$('.list').css('background-color','rgb(230,230,230)');
	$('#ranbut').css('background-color','rgb(250,250,250)');
}

function Random_picture_ex() {
	// 随机涩图
	$("#home").hide();
	$("#PID").hide();
	$("#Random_picture").hide();
	$("#Random_picture_ex").show();
	$('.list').css('background-color','rgb(230,230,230)');
	$('#ran_exbut').css('background-color','rgb(250,250,250)');
}

function imgs(){
	//刷新随机图片
	var url=Math.random();
	document.getElementById("img1").src='https://iw233.cn/api.php?sort=yin'+ '&u=' + url ;
}

function RandomImgs(max){
	if (max=="Random") {
	    document.getElementById("tags").innerHTML = "";
		var pixiv = new XMLHttpRequest();//建立所需的对象
		pixiv.open('GET', 'https://ovooa.com/API/Pximg/', true);//打开链接
		pixiv.send();//发送请求
		pixiv.onreadystatechange = function () {
			if (pixiv.readyState == 4 && pixiv.status == 200) {
				var json = pixiv.responseText;//获取文本
				obj = JSON.parse(json);//转换为json字符串
				//获取数据
				document.getElementById("title").innerHTML = "标题："+obj.data.title;
				document.getElementById("pid").innerHTML = "作品ID："+obj.data.pid;
				document.getElementById("author").innerHTML = "作者："+obj.data.author;
				document.getElementById("uid").innerHTML = "作者ID："+obj.data.uid;
				document.getElementById("WH").innerHTML = "图片尺寸："+obj.data.width+"*"+obj.data.height;
				document.getElementById("pixivimg").src = "https://px3.rainchan.win/img/original/"+obj.data.pid;
				document.getElementById("pages").innerHTML = obj.data.urls.original;
				document.getElementById("pageCount").innerHTML = "";
				for (var i = 0; i < obj.data.tags.length; i++) {
					var x = obj.data.tags[i] + "；";
					var y = document.getElementById("tags").innerHTML;
					document.getElementById("tags").innerHTML = y+x;
				}
			}
		}
	}
}

function acgmx(){
	document.getElementById("tags").innerHTML = "";
	var q = document.getElementById("q").value;
	var pixiv = new XMLHttpRequest();//建立所需的对象
	pixiv.open('GET', 'https://pximg.rainchan.win/imginfo?img_id=' + q, true);//打开链接
	pixiv.send();//发送请求
	pixiv.onreadystatechange = function () {
			if (pixiv.readyState == 4 && pixiv.status == 200) {
			var json = pixiv.responseText;//获取文本
				obj = JSON.parse(json);//转换为json字符串
				if (obj.urls.original=="") {
					var str = obj.profileImageUrl;
					var original = str.replace("i.pximg.net","i.acgmx.com");
				}
				else if (obj.urls.original!=""){
					var str = obj.urls.original;
					var original = str.replace("i.pximg.net","i.acgmx.com");
				}
			//获取数据
			document.getElementById("title").innerHTML = "标题："+obj.title;
			document.getElementById("pid").innerHTML = "作品ID："+obj.illustId;
			document.getElementById("author").innerHTML = "作者："+obj.userName;
			document.getElementById("uid").innerHTML = "作者ID："+obj.userId;
			document.getElementById("pageCount").innerHTML = "共"+obj.pageCount+"P";
			document.getElementById("WH").innerHTML = "图片尺寸："+obj.width+"*"+obj.height;
			document.getElementById("pixivimg").src = "https://px3.rainchan.win/img/original/"+obj.illustId;
			document.getElementById("pages").innerHTML = original;
			for (var i = 0; i < obj.tags.tags.length; i++) {
				var x = obj.tags.tags[i].tag + "；";
				var y = document.getElementById("tags").innerHTML;
				document.getElementById("tags").innerHTML = y+x;
			}
			if (obj.pageCount==1) {
  				$("#buts").hide();
			}
			else if (obj.pageCount>1) {
				$("#buts").show();
			}
		}
	}
}

function imgtool(air) {
	// 翻页
	var a = document.getElementById("pages").innerHTML;//直链
	var jpg = a.replace(/.*_p\d+/g,"");//获取后缀
	var id = a.replace(/.*_/g,"");//获取链接P数
	var id = id.replace(/[^0-9]+/g,"");//获取链接P数
	var b = document.getElementById("pageCount").innerHTML;
	var cuont = b.replace(/[^0-9]+/g,"");//当前P
	var imgurl = a.replace(/_p.*/g,"");//获取无后缀图片连接
	var c1 = parseInt(id)+1;
	var c2 = parseInt(id)-1;
	if (air=="wd") {
		if (c1<cuont) {
			document.getElementById("pixivimg").src = imgurl+"_p"+c1+jpg;
			document.getElementById("p").innerHTML = c1;
			document.getElementById("pages").innerHTML = imgurl+"_p"+c1+jpg;
		}
		else {
			document.getElementById("pixivimg").src = imgurl+"_p0"+jpg;
			document.getElementById("p").innerHTML = "0";
			document.getElementById("pages").innerHTML = imgurl+"_p0"+jpg;
		}
	}
	else if (air=="up") {
		if (c2>=0) {
			document.getElementById("pixivimg").src = imgurl+"_p"+c2+jpg;
			document.getElementById("p").innerHTML = c2;
			document.getElementById("pages").innerHTML = imgurl+"_p"+c2+jpg;
		}
	}
}	
