var FULL_SCREEN_DIALOG_TITLE;
var FULL_SCREEN_DIALOG_SET_OTHER_BTN = false;

function bytesToSize(a) {
  if (a === 0) return "0 B";
  var b = 1024,
    c = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    d = Math.floor(Math.log(a) / Math.log(b));
  return (a / Math.pow(b, d)).toPrecision(5) + " " + c[d];
}

function submitForm(url){
    var form = document.createElement('form');
    form.action = url;
    form.method = 'GET';
	document.body.appendChild(form);
	form.submit();
}

function loadIframe(url){
    var iframe = document.createElement('iframe');
	iframe.setAttribute('frameborder', 0);
	iframe.setAttribute('width', 0);
	iframe.setAttribute('height', 0);
	iframe.src = url;
	document.body.appendChild(iframe);
}

function replaceNewline(a) {
  a = a.replace(/(\r\n|\n|\r)/g, "<br/>");
  a = a.replace(/(\\r\\n|\\n|\\r)/g, "<br/>");
  return a;
}

function sendHttpRequest(type, url, data, head, callback) {
  data = data?data:'';
  let mXMLHttpRequest = new XMLHttpRequest();
  mXMLHttpRequest.open(type, url, true);
  if (head) {
    for (var i in head) {
      mXMLHttpRequest.setRequestHeader(i, head[i]);
    }
  } else {
    mXMLHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  };
  mXMLHttpRequest.withCredentials = true
  mXMLHttpRequest.send(data);
  mXMLHttpRequest.onloadend = function() {
	let responseText = this.responseText;
    if(callback){
      callback(responseText?JSON.parse(responseText):'');
    }
  };
  mXMLHttpRequest.onerror = function() {
    showTips('网络错误 Network Error');
  };
}

function randomText(count){
  let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let rand = '';
  for(var i = 0;i < count; i++){
    rand += arr[Math.floor(Math.random() * 36)];
  }
  return rand;
}

function randomUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
}

function showLoadUrlDialog(_title, _url, _buttons){
  if(!mdui){
    return;
  }
  let _spinner_randomID = randomText(16);
  let _iframe_randomID = randomText(16);
  let _loadUrlDialog = mdui.dialog({
      title: _title,
      content: `<div id="${_spinner_randomID}" style="height: 100%;display: flex;justify-content: center;/* align-content: center; */align-items: center;width: 100%;"><div class="mdui-spinner"></div></div><iframe id="${_iframe_randomID}" frameborder="0" seamless align="middle" marginwidth="0px" marginheight="0px" width="100%" height="100%" src="${_url}" style="display: none;width: 100%;height: 100vh;"></iframe>`,
      buttons: _buttons
    });
	_loadUrlDialog.$element[0].querySelector('.mdui-dialog-content').style.padding = '0px';
	_loadUrlDialog.$element[0].style.maxWidth = '448px';
    mdui.mutation();
    let _version_list_dialog_spinner = document.querySelector('#' + _spinner_randomID);
    let _version_list_dialog_iframe = document.querySelector('#' + _iframe_randomID);
    _version_list_dialog_iframe.onload = function(){
      _version_list_dialog_spinner.style.display = 'none';
      _version_list_dialog_iframe.style.display = 'block';
      _loadUrlDialog.handleUpdate();
      _version_list_dialog_iframe.style.height = '-webkit-fill-available';
    };
}

function isEmpty(a) {
    return (
      a == "" ||
      a == "undefined" ||
      a == undefined ||
      a == "null" ||
      a == false ||
      a == 0 ||
      a == null ||
      a == "NaN" ||
      a == NaN ||
      a.length == 0
    );
}

function isPCUA() {
    var a = navigator.userAgent;
    var b = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var c = true;
    for (var i = 0; i < b.length; i++) {
      if (a.indexOf(b[i]) > 0) {
        c = false;
        break;
      }
    }
    if (window.screen.width < 599) {
      c = false;
    }
    return c;
}

function isIOSUA() {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

function isQQUA() {
    return /\sQQ\/\d/i.test(window.navigator.userAgent);
}

function isWeChatUA() {
    return /micromessenger/i.test(
      window.navigator.userAgent.match(/MicroMessenger/i)
    );
}

function isAlipayUA() {
    return /AlipayClient/i.test(window.navigator.userAgent);
}

function isQQNumber(a) {
    return /^[1-9][0-9]{4,9}$/gim.test(a);
}

function isPhoneNumber(a) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(
      a
    );
}

function isEmails(a) {
    return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
      a
    );
}

function getTimeStamp() {
    return parseInt(Date.parse(new Date()).toString().substr(0, 10));
}

function dateToTimeStamp(a) {
    return parseInt(new Date(a).getTime() / 1000);
}

function stampToDateText(a, b) {
	b = b || 'Y-m-d';
    var c = function(d) {
        if (d < 10) {
            return'0' + d;
        }
        return d;
    };
    var e = a ? new Date(a) : new Date();
    var f = e.getFullYear();
    var g = c(e.getMonth() + 1);
    var h = c(e.getDate());
    var i = c(e.getHours());
    var j = c(e.getMinutes());
    var k = c(e.getSeconds());
    return b.replace(/Y|m|d|H|i|s/ig,
    function(l) {
        return ({
            Y: f,
            m: g,
            d: h,
            H: i,
            i: j,
            s: k
        })[l];
    });
}

function formatTimeStamp(a) {
    var b = getTimeStamp() - parseInt(a);
    var c = "";
    if (b < 5) {
      c = "刚刚";
	} else if (b < 60) {
      c = b + "秒前";
	} else if (b < 3600) {
      c = Math.ceil(b / 60) + "分钟前";
    } else if (b < 86400) {
      c = Math.ceil(b / 3600) + "小时前";
	} else if (b < 604800) {
	  let _day = Math.ceil(b / 86400);
	  if (_day < 2) {
	  	c = "昨天";
	  } else if (_day <= 3){
		c = "前天";
	  } else {
		c = _day + "天前";
	  }
	} else if (b < 2592000) {
      c = Math.ceil(b / 604800) + "周前";
    } else if (b < 31536000) {
      c = Math.ceil(b / 2592000) + "个月前";
    } else {
	  c = stampToDateText(new Date().getTime(), "Y-m-d").replace(new Date().getFullYear() + "-", "" );
	}
    return c;
}

function getUrlParams(a, b) {
	 if(isEmpty(a)){
		a = location.href;
	 }
    return new URL(a).searchParams.get(b);
}

function parseUrlParams(a) {
    if (a.substring(0, 1) == "?") {
      a = a.split("?")[1];
    }
    let b = a.split("#")[0].split("&");
    const c = {};
    b.forEach(function (d) {
      let [e, f = ""] = d.split("=");
      c[e] = f;
    });
    return c;
}

function buildUrlParams(a) {
    return new URLSearchParams(Object.entries(a)).toString();
}

function isEquals(a, b) {
    return a == b || a.length == b.length;
}

function isContains(a, b) {
    return a.indexOf(b) != -1;
}

function openNewWindow(a, b) {
    setTimeout(function () {
      window.open(a);
    }, !b?0:b);
}
  
function locationUrl(a, b, c) {
    setTimeout(function () {
      b ? window.location.replace(a) : (window.location.href = a);
    }, !c?0:c);
}

function openQQClient(a, b) {
    if (b) {
      openNewWindow("mqq://card/show_pslcard?src_type=internal&source=sharecard&version=1&uin=" + a + "&type=group",0);
    } else {
      if(isPCUA()) {
		  locationUrl("tencent://message/?uin=" + a, true, 0);
	  } else {
		  openNewWindow("mqq://card/show_pslcard?src_type=internal&source=sharecard&version=1&uin=" + a,0);
	  }
    }
}

function openSendEmails(a) {
    openNewWindow("mailto:" + a, 0);
}

function isWebsitelink(a) {
    var myreg =
      /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    return myreg.test(a);
}

function showToast(msg){
	if(mdui && !isEmpty(msg)){
		mdui.snackbar({
			message: msg,
			position: isPCUA()?'right-top':'bottom',
			closeOnOutsideClick: true,
			timeout: 2000
		});
	} else if(!mdui && msg){
		alert(msg);
	}
}

function getScrollTop() {
	return document.documentElement.scrollTop || document.body.scrollTop;
}

function getScrollHeight() {
	return document.documentElement.scrollHeight || document.body.scrollHeight;
}

function getClientHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight;
}

function showEggEfect(){
	if(!confetti){
		return;
	}
	var end = Date.now() + 100;
	(function frame(){
		confetti({
			particleCount: 7,
			angle: 60,
			spread: 55,
			origin:{
				x: 0,
				y: 0.8
			}
		});
		confetti({
			particleCount: 7,
			angle: 120,
			spread: 55,
			origin: {
				x: 1,
				y: 0.8
			}
		});
		if(Date.now() < end ){
			requestAnimationFrame(frame);
		}
	}());
}

function isAIDEApp() {
	return getUrlParams(false, 'from') == 'app';
}

function showTips(msg, type){
	if(isEmpty(msg)){
		return;
	}
	if(!isAIDEApp()){
		window.top.showToast(msg);
		return;
	}
	if(type == 1){
		aide.toastWarning(msg);
	}else if(type == 2){
		aide.toastError(msg);
	}else if(type == 3){
		aide.toastSuccess(msg);
	}else{
		aide.toastNormal(msg);
	}
}

function getCookies(a) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(a).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || false
    );
}

function setCookies(a, b, c, d) {
    a = a + "=" + escape(b);
    isEmpty(c)
      ? (a += "; expires=Fri,31 Dec 9999 23:59:59 GMT")
      : ((b = new Date()),
        b.setTime(b.getTime() + 1e3 * c),
        (a += "; expires=" + b.toGMTString()));
    document.cookie = a + '; path=/; ' + (isEmpty(d)?'':'; domain=' + d+ '; ');
}

function removeCookies(a) {
    document.cookie = a + '=; expires=Thu,01 Jan 1970 00:00:00 UTC; path=/; ';
}

function serializeArray(elms) {
	var result = new Array();  
    if (elms) {
		elms = document.querySelector(elms);
		let input = elms.querySelectorAll('input,select,textarea');
		for (var i = 0; i < input.length; i++) {
			let field = input[i];
        	let type = field.type;
			let name = field.name;
			let value = field.value;
        	if (name && field.nodeName.toLowerCase() != 'fieldset' && !field.disabled){
				if(type != 'submit' && type != 'reset' && type != 'button' && type != 'file' && type != 'checkbox' && (type != 'radio' || field.checked)) {
            		result[name] = value;
        		} else if (type == 'checkbox') {
        	    	result[name] = field.checked?1:0;
				}
        	}
    	}
	}
    return result;
}

function serializeParam(a) {
    return new URLSearchParams(Object.entries(serializeArray(a))).toString();
}

function loadJavaScriptSrc(a) {
    var b = document.createElement("script");
    b.type = "text/javascript";
	b.src = a;
    document.body.appendChild(b);
}

function loadCssSrc(a) {
    var b = document.createElement("link");
    b.rel = "stylesheet";
    b.type = "text/css";
	b.href = a;
    document.getElementsByTagName("head").item(0).appendChild(b);
}

function openFullScreenDialog(title, cont, btnStr, callback1, callback2) {
	FULL_SCREEN_DIALOG_TITLE = title;
	showFullScreenDlgLoad();
	let full_screen_dialog = new mdui.Dialog('#mdui_full_dialog', {
		history: false,
		modal: true
	});
	full_screen_dialog.open();
	document.querySelector('#mdui_full_dialog_tle').innerText = title;
	document.querySelector('#mdui_full_dialog_cont').innerHTML = cont;
	document.querySelector('#mdui_full_dialog_right_btn').innerText = btnStr;
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'block';
	mdui.mutation();
    full_screen_dialog.handleUpdate();
	document.querySelector('#mdui_full_dialog_left_btn').onclick = function(){
		if(FULL_SCREEN_DIALOG_SET_OTHER_BTN){
			if(callback1){
				callback1();
			}
			returnFullScreenDlgBack();
		}else{
			full_screen_dialog.close();
		}
	}
	document.querySelector('#mdui_full_dialog_right_btn').onclick = function(){
		if(callback2){
			callback2();
		}
	}
	return full_screen_dialog
}

function setFullScreenDialogTitle(title){
	document.querySelector('#mdui_full_dialog_tle').innerText = title;
}

function showFullScreenDlgLoad(){
	document.querySelector('#mdui_full_dialog_load_tle').style.display = 'block';
	document.querySelector('#mdui_full_dialog_load_cont').style.display = 'flex';
	document.querySelector('#mdui_full_dialog_tle').style.display = 'none';
	document.querySelector('#mdui_full_dialog_tle_input').style.display = 'none';
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_other_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_cont').style.display = 'none';
}
	
function hideFullScreenDlgLoad(){
	document.querySelector('#mdui_full_dialog_load_tle').style.display = 'none';
	document.querySelector('#mdui_full_dialog_tle').style.display = 'block';
	//document.querySelector('#mdui_full_dialog_tle_input').style.display = 'block';
	if(FULL_SCREEN_DIALOG_SET_OTHER_BTN){
		document.querySelector('#mdui_full_dialog_other_btn').style.display = 'block';
	}else{
		document.querySelector('#mdui_full_dialog_right_btn').style.display = 'block';
	}
	document.querySelector('#mdui_full_dialog_cont').style.display = 'block';
	document.querySelector('#mdui_full_dialog_load_cont').style.display = 'none';
}

function setFullScreenDlgBtn(txt, callback){
	FULL_SCREEN_DIALOG_SET_OTHER_BTN = true;
	document.querySelector('#mdui_full_dialog_other_btn').innerText = txt;
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_other_btn').style.display = 'block';
	document.querySelector('#mdui_full_dialog_other_btn').onclick = function(){
		if(callback){
			callback();
		}
	}
}

function returnFullScreenDlgBack(){
	FULL_SCREEN_DIALOG_SET_OTHER_BTN = false;
	document.querySelector('#mdui_full_dialog_tle').innerText = FULL_SCREEN_DIALOG_TITLE;
	document.querySelector('#mdui_full_dialog_other_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'block';
	document.querySelector('#mdui_full_dialog_other_btn').onclick = null;
}