/**
 * cookie操作类
 */
class Cookie{
    /**
     * @property cookie cookie的名字
     */
    constructor(name){
        this.cookie = name;
        this.cookieValue = this.get_cookie();
    }
    /**
     * 获得cookie的值
     */
    get_cookie() {
        let reg = `(^| )${this.cookie}=([^;]*)(;|$)`; // 这个正则表达式我也不是很理解
        let a = document.cookie.match(reg);
        if (a) {
            return decodeURIComponent(a[2]);
        } else {
            return -1;
        }
    }
    /**
     * 删除cookie
     */
    del_cookie() {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = `${this.cookie}=${this.cookieValue}` +';expires=' + exp.toUTCString();
    }
    /**
     * 设置cookieValue的值
     */
    set_cookie(value){
        this.cookieValue = value;
        document.cookie = `${this.cookie}=${this.cookieValue}`;
    }
}
class Scroll {
    // 滚动条在Y轴上的滚动距离（文档在当前视口的顶部与文档的顶部的距离）
    static getScrollTop() {
        let scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
        // body的滚动高度
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        // HTML的滚动高度
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        // 那个长那个就是高度
        scrollTop = bodyScrollTop > documentScrollTop ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }
    // 文档可以滚动的高度（文档总高度）
    static getScrollHeight() {
        let scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = bodyScrollHeight > documentScrollHeight ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }
    // 浏览器视口的高度
    static getWindowHeight() {
        let windowHeight = 0;
        /* 
         * 检测标准兼容模式是否开启
         * 当document.compatMode等于BackCompat时， 浏览器客户区高度是document.body.clientHeight
         * 当document.compatMode等于CSS1Compat时， 浏览器客户区高度是document.documentElement.clientHeight
         */
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
}

export {Cookie, Scroll};