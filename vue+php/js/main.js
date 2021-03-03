/* 获得用户cookie */
function get_cookie(name) {
	let reg = `(^| )${name}=([^;]*)(;|$)`;  // 这个正则表达式我也不是很理解
	let a = document.cookie.match(reg);
	if (a) {
		return decodeURIComponent(a[2]);
	} else {
		return 0;
	}
}
/* 删除用户cookie */
function del_cookie(name) {
	let cookie = get_cookie(name);
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	document.cookie = `${name}=` + cookie + ';expires=' + exp.toUTCString();
}