
function acgmx() {
	menu_off();
	let max = $('#max').val();
	let min = $('#min').val();
	let word = $('#word').val();
	let d = Math.floor(Math.random() * (max - min) ) + +min;
	let url = 'https://43.249.193.233:40526?'+'type=search&word='+word+'&page='+d+'&n=1';

	let pixiv = new XMLHttpRequest();//建立所需的对象
	pixiv.open('GET', url, true);//打开链接
	pixiv.send();
	pixiv.onreadystatechange = function () {
		if (pixiv.readyState == 4 && pixiv.status == 200) {
			let json = pixiv.responseText;

			let obj = JSON.parse(json);
			let sel = $('.sel3').find('option:selected').text();
			console.log(obj.illusts);
			for (let i = 0; i < 29; i++) {
				//过滤r18标签
				if (obj.illusts[i].tags[0].name != 'R-18') {
					//获取图片链接
					if (obj.illusts[i].page_count == '1') {
						var str = obj.illusts[i].meta_single_page.original_image_url;
					} else {
						var str = obj.illusts[i].meta_pages[0].image_urls.original;
					}
					var imgurl1 = str.replace('i.pximg.net',sel);
					if (sel == 'px3') {
						//图源
						var imgurl1 = 'https://px3.rainchan.win/img/original/'+obj.illusts[i].id;
						var imgurl = 'https://px3.rainchan.win/img/original/'+obj.illusts[i].id;
					} else {
						var str1 = obj.illusts[i].image_urls.original;
						var imgurl = str1.replace('i.pximg.net',sel);
					}
					//生成图片
					let id = obj.illusts[i].id;
					$('.div6').append('<div class="556"><img src="'+imgurl+'" id="'+id+'" onclick="image(\''+id+'\')"/></div>');
				}
			}
		}
	}
}

function menu() {
	if ($('.menu').is(':visible')) {
		//修改动画名称
		$('.menu').css('animation-name','menu_off');
		setTimeout(function() {
			//动画结束前隐藏内容
			$('.menu nav').hide();
		}, 100);
		setTimeout(function() {
			//最后隐藏背景元素，恢复动画名称			
			$('.menu').hide();
			$('.menu').css('animation-name','menu');
		}, 400)
	} else {
		//隐藏内容，显示背景元素
		$('.menu nav').hide();
		$('.menu').show();
		setTimeout(function() {	
			//延迟显示内容
			$('.menu nav').show();
		}, 100)
	}
}

function menu_off() {
	if ($('.menu').is(':visible')) {
		//修改动画名称
		$('.menu').css('animation-name','menu_off');
		setTimeout(function() {
			//动画结束前隐藏内容
			$('.menu nav').hide();
		}, 100);
		setTimeout(function() {
			//最后隐藏背景元素，恢复动画名称	
			$('.menu').hide();
			$('.menu').css('animation-name','menu');
		}, 400);
	}
}

function detail_off() {
	$('.detail_bj').css('animation-name','detail_bj_off');
	setTimeout(function() {
		$('.detail_bj').hide();
		$('.detail_bj').css('animation-name','detail_bj');
	},500);
	$('.detail').remove();
}

function detail_bj() {
	$('.detail_bj').css('animation-name','detail_bj_off');
	setTimeout(function() {
		$('.detail_bj').hide();
		$('.detail_bj').css('animation-name','detail_bj');
	}, 500);
	$('.detail').remove();
}

/*
function image(url) {
	$('.div6').hide();
	$('.div7').show();
	$('.div7 img').attr('src',url);
}
*/

function image(id) {
	//获取当前元素
	let x = $('[id='+id+']').offset().left;
	let y = $('[id='+id+']').offset().top;
	//克隆一个元素
	let aa = $('[id='+id+']').clone().attr('id','665');
	//在图片后面添加一个div元素
	$('[id='+id+']').after('<div class="detail"><button onclick="detail_off()">X</button></div>');
	//将图片添加进新的div里
	$('.detail').append(aa);
	//设置一些属性
	$('#665').attr('onclick','detail_bj()')
	//$('#665').attr('onclick','open("https://px3.rainchan.win/img/original/'+id+'")');
	$('#665').css('opacity','1');
	$('.detail').css({
		top: y,
		left: x,
	});
	//显示背景
	$('.detail_bj').show();
}

function open(url) {
	window.open(url);
}

function ret() {
	$('.div7').hide();
	$('.div6').show();
}

$(function() {
	$('#word').bind('keypress',function(event) {
		if (event.keyCode == '13') {
			$('#word').blur();
			acgmx();
		}
	});
});

/*
$.ajax({
  url: 'https://43.249.193.233:31841/pixiv.php?type=search&word=hutao',
  success: function(data){
  	if (data) {
  		 
  	}
  }
});


$('img').on('mousedown',function(){
	console.log($(this).attr('src'));
});

$(document).ready(function(){
  $(".div6 div").click(function(){
   alert('1');
  });
});


let vConsole = new VConsole();
console.log('test');
*/
