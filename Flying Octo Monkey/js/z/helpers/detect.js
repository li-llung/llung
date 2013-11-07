/*
//  detect.js
*/
var z = z || {};
(function($, z){
    'use strict';
    z.detect = {
		device: {},
		agent: navigator.userAgent,
		ipad: function(){
			z.detect.device.isiPad = z.detect.agent.match(/iPad/i) !== null;
			return (z.detect.device.isiPad);
		},
		iphone: function(){
			z.detect.device.isiPhone = z.detect.agent.match(/iPhone/i) !== null;
			return (z.detect.device.isiPhone);
		},
		ipod: function(){
			z.detect.device.isiPod = z.detect.agent.match(/iPod/i) !== null;
			return (z.detect.device.isiPod);
		},
		ios: function(){
			z.detect.device.isIos = (z.detect.ipad() || z.detect.iphone() || z.detect.ipod());
			return (z.detect.device.isIos);
		},
        bb: function(){
            z.detect.device.bb = (z.detect.agent.indexOf("BlackBerry") >= 0) ? (!!((z.detect.agent.indexOf("WebKit") >= 0))) : false;
            return (z.detect.device.bb);
        },
		android: function(){
			z.detect.device.isAndroid = z.detect.agent.toLowerCase().indexOf("android") > -1;
			return z.detect.device.isAndroid;
		},
		win: function(){
			z.detect.device.isWin = (z.detect.agent.toLowerCase().indexOf("msie") > -1 && z.detect.agent.toLowerCase().indexOf("phone") > -1);
			return z.detect.device.isWin;
		},
		mobile: function(){
			return (z.detect.ios() || z.detect.android() || z.detect.win() || z.detect.bb());
		}
    };
})(jQuery, z);