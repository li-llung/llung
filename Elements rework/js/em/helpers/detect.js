/*
//  detect.js
*/
var Em = Em || {};
(function($, Em){
    'use strict';
    Em.detect = {
		device: {},
		agent: navigator.userAgent,
		ipad: function(){
			Em.detect.device.isiPad = Em.detect.agent.match(/iPad/i) !== null;
			return (Em.detect.device.isiPad);
		},
		iphone: function(){
			Em.detect.device.isiPhone = Em.detect.agent.match(/iPhone/i) !== null;
			return (Em.detect.device.isiPhone);
		},
		ipod: function(){
			Em.detect.device.isiPod = Em.detect.agent.match(/iPod/i) !== null;
			return (Em.detect.device.isiPod);
		},
		ios: function(){
			Em.detect.device.isIos = (Em.detect.ipad() || Em.detect.iphone() || Em.detect.ipod());
			return (Em.detect.device.isIos);
		},
    bb: function(){
        Em.detect.device.bb = (Em.detect.agent.indexOf("BlackBerry") >= 0) ? ((Em.detect.agent.indexOf("WebKit") >= 0) ? true: false) : false;
        return (Em.detect.device.bb);
    },
		android: function(){
			Em.detect.device.isAndroid = Em.detect.agent.toLowerCase().indexOf("android") > -1;
			return Em.detect.device.isAndroid;
		},
		win: function(){
			Em.detect.device.isWin = (Em.detect.agent.toLowerCase().indexOf("msie") > -1 && Em.detect.agent.toLowerCase().indexOf("phone") > -1);
			return Em.detect.device.isWin;
		},
		mobile: function(){
			return (Em.detect.ios() || Em.detect.android() || Em.detect.win() || Em.detect.bb());
		}
    };
})(jQuery, Em);