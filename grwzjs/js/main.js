/* 图片放大展示特效jq插件 */

(function ($) {//创建闭包匿名函数
    $.fn.imgClick = function (options) {//创建jQuery方法
        var setting = {
            speed:500
        }
        //设置默认显示图片的速度
        $.extend(setting,options);//将用户设置数据的覆盖默认设置
        this.each(function () {//遍历选中的元素
            $(this).click(function (event) {//jq的鼠标移入事件
                var div = document.createElement("div");//创建div元素以显示图片
                div.setAttribute("id","tooltip");//添加id选择器
                var img = document.createElement("img");//创建图片元素
                img.setAttribute("src",this.src);//获取当前节点图片连接，并连接到新节点
                div.appendChild(img);//添加图片节点到div中
                document.body.appendChild(div);//添加到body中
                $(div).fadeIn(setting.speed);//显示图片
                div.style.display = "flex";//将图片盒子设置为弹性盒子，必须放在淡入之后趁他未显示完
                document.getElementById("wrapper").classList.add("is-menu-visibility");//设置菜单显示的类
                $(div).click(function () {//设置图片盒子的点击事件
                    $(this).fadeOut(setting.speed,function () {//设置图片盒子淡出，然后执行回调函数然后删除
                        document.body.removeChild(this);//删除图片盒子
                    });
            		document.getElementById("wrapper").classList.remove("is-menu-visibility");//移出菜单显示的类
                });
            });
        });
        return this;//返回当前jQuery对象
    }
})(jQuery);

/* 打字机特效jq插件 */

(function ($) {
    $.fn.typeLetter = function (options) {
        var setting = {
            speed1:500,
            speed2:150
        }
        //字出现的默认速度
        $.extend(setting,options);//将用户设置数据的覆盖默认设置
        this.each(function () {//遍历选中的元素
            this.classList.add("type");//为当前元素添加伪类下划线
            var content = this.innerText;//获取当前元素的文本
            this.innerText = '';//设置当前元素文本为空
            var n = 0;//设置计数器
            function interval(letter) {
                if (letter == ',' || letter == '.' || letter == '，' || letter == '。') {//判断是否为标点符号
                    return Math.floor(Math.random() * setting.speed1 + setting.speed1);//返回有标点的速度
                } else {
                    return Math.floor(Math.random() * setting.speed2 + setting.speed2);//返回无标点的速度
                }
            }
            //设置速度
            function typing(text,target) {
                if (n < text.length) {//判断是否超出文本范围
                    if (typeof(text[n]) != undefined) {//判断字是否存在
                        target.innerText += text[n];//向元素节点写入字
                    }
                    n++;//计数器变化
                    setTimeout(function () {
                        typing(text,target);
                    },interval(text[n - 1]));
                    //间隔调用打字函数
                } else {
                    target.classList.remove("type");//执行完毕后移出伪类下划线
                }
            }
            //实现打字的函数
            typing(content,this);//运行函数
        });
        return this;//返回当前jQuery对象
    }
})(jQuery);

/* 图片展示覆盖特效函数 */

function imgCover() {
    var wrapper = document.getElementsByClassName("top")[0];//获取顶层的元素节点
    var handle = document.getElementsByClassName("handle")[0];//获取红色线条的元素节点
    var skew = 1000;//顶层向左偏移的补偿量
    $("#Fwrap").mousemove(function (event) {
        var delta = 0;//鼠标与覆盖层移动的关系变量
        delta = (event.clientX - window.innerWidth / 2) / 2;
        //以窗口中线为标准获得鼠标与移动的偏移量，越靠近中线偏移少，越靠近边缘偏移越多
        handle.style.left = event.clientX + delta +'px';//设置红色线条的移动
        wrapper.style.width = event.clientX + delta + skew + 'px';//设置顶层的移动
    });
}

/* 滚动显示列表特效函数 */

function scrollLi() {
    $(".fa-ul li").eq(0).fadeOut('slow',function () {//选中列表第一个元素，调用淡出完毕后执行回调函数
        var li = this.cloneNode(true);//克隆当前元素
        var ul = this.parentNode;//获取当前元素的父节点
        ul.appendChild(li);//添加克隆的元素
        ul.removeChild(this);//移出当前元素
        $(li).fadeIn('slow');//淡入克隆的元素
    });
}

/* 图片轮播特效 */

function picturePlay() {
    var cont = document.querySelector(".cont");//获取cont节点
    setTimeout(function () {
        cont.classList.remove("s-inactive");
    },500);//500毫秒之后s-inactive移出类
    $(".el").each(function () {//遍历每个el节点
        $(this).click(function () {//为el节点添加点击事件
            if (this.classList.contains("s-active")) {//判断el节点是否有s-active类，如果有就终止执行，没有就移出cont和el的类
                return;
            }
            cont.classList.add("s-el-active");
            this.classList.add("s-active");
        });
        $(".el-close-btn").each(function () {//遍历每个el-close-btn节点
            $(this).click(function (event) {//为el-close-btn添加点击事件
                event.stopPropagation();//终止事件的冒泡和捕获
                cont.classList.remove("s-el-active");//移出cont节点的类
                document.querySelector(".el.s-active").classList.remove("s-active");//移出.el.s-active节点的类
            });
        });
    });
}

$(document).ready(function () {

    "use strict";

    /* 一些小特效 */

    //文本框特效
    $("#search").focus(function(){//当文本框获得焦点时改变长度
        $(this).animate({
            width:"300px"
        });
    }).blur(function(){//当文本框失去焦点时长度不变
        $(this).animate({
            width:"150px"
        });
    });
    //菜单的特效
    $(".menu > div").click(function(){//当点击菜单时淡入同时网页模糊
        var menu = document.getElementById("menu");//获取菜单节点
        $(menu).fadeIn(500);//淡入菜单
        menu.style.display = 'flex';//将菜单设置为弹性盒子
        document.getElementById("wrapper").classList.add("is-menu-visibility");//设置菜单显示的类
	});
	$("#menu").click(function(){//点击菜单链接时淡出同时网页恢复正常
		$(this).fadeOut(500);//淡出菜单
        document.getElementById("wrapper").classList.remove("is-menu-visibility");//移出菜单显示的类
	});
    //旋转停止
    $(".left-one img").eq(1).mouseenter(function () {
        this.style.animationPlayState = "paused";
        this.style.cursor = "pointer";
    }).mouseleave(function () {
        this.style.animationPlayState = "running";
    });
});
