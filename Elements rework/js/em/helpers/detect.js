/*
//  detect.js
*/
var em = em || {};
(function($, em){
    'use strict';
    em.detect = {
		device: {},
		agent: navigator.userAgent,
		ipad: function(){
			em.detect.device.isiPad = em.detect.agent.match(/iPad/i) !== null;
			return (em.detect.device.isiPad);
		},
		iphone: function(){
			em.detect.device.isiPhone = em.detect.agent.match(/iPhone/i) !== null;
			return (em.detect.device.isiPhone);
		},
		ipod: function(){
			em.detect.device.isiPod = em.detect.agent.match(/iPod/i) !== null;
			return (em.detect.device.isiPod);
		},
		ios: function(){
			em.detect.device.isIos = (em.detect.ipad() || em.detect.iphone() || em.detect.ipod());
			return (em.detect.device.isIos);
		},
    bb: function(){
        em.detect.device.bb = (em.detect.agent.indexOf("BlackBerry") >= 0) ? ((em.detect.agent.indexOf("WebKit") >= 0) ? true: false) : false;
        return (em.detect.device.bb);
    },
		android: function(){
			em.detect.device.isAndroid = em.detect.agent.toLowerCase().indexOf("android") > -1;
			return em.detect.device.isAndroid;
		},
		win: function(){
			em.detect.device.isWin = (em.detect.agent.toLowerCase().indexOf("msie") > -1 && em.detect.agent.toLowerCase().indexOf("phone") > -1);
			return em.detect.device.isWin;
		},
		mobile: function(){
			return (em.detect.ios() || em.detect.android() || em.detect.win() || em.detect.bb());
		}
    };
})(jQuery, em);