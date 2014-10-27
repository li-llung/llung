(function ($) {
    'use strict';
    function show_overlay(){
		overlay.reveal($(this));
    }
    function close_overlay(){
		overlay.conceal($(this));
    }
	var detect = {
		device: {},
		agent: navigator.userAgent,
		ipad: function(){
			detect.device.isiPad = detect.agent.match(/iPad/i) !== null;
			return (detect.device.isiPad);
		},
		iphone: function(){
			detect.device.isiPhone = detect.agent.match(/iPhone/i) !== null;
			return (detect.device.isiPhone);
		},
		ipod: function(){
			detect.device.isiPod = detect.agent.match(/iPod/i) !== null;
			return (detect.device.isiPod);
		},
		ios: function(){
			detect.device.isIos = (detect.ipad() || detect.iphone() || detect.ipod());
			return (detect.device.isIos);
		},
        bb: function(){
            detect.device.bb = (detect.agent.indexOf("BlackBerry") >= 0) ? (!!((detect.agent.indexOf("WebKit") >= 0))) : false;
            return (detect.device.bb);
        },
		android: function(){
			detect.device.isAndroid = detect.agent.toLowerCase().indexOf("android") > -1;
			return detect.device.isAndroid;
		},
		win: function(){
			detect.device.isWin = (detect.agent.toLowerCase().indexOf("msie") > -1 && detect.agent.toLowerCase().indexOf("phone") > -1);
			return detect.device.isWin;
		},
		mobile: function(){
			return (detect.ios() || detect.android() || detect.win() || detect.bb());
		}
	},
	overlay = {
		defaults: {
		},
		relocate: {
			bg: function(){

			},
			me: function(){

			}
		},
		build: {
			bg: function(){

			},
			bar: function(){

			},
			content: function(){

			}
		},
		add: {
			shadow: function(){

			},
			rounded: function(){

			}
		},
		reveal: function(){

		},
		conceal: function(){

		},
		init: function(action, item, options){
			options = $.extend(overlay.defaults, options);
		}
	};
    $.fn.extend({
        overlay: function(action, options, callback) {
            if(action === 'open'){
				overlay.reveal($(this));
            }else if(action === 'close'){
				overlay.conceal($(this));
            }else{
				overlay.init($(this));
            }
        }
    });
    var my_overlay = function(){
		console.log('function call');
    };
    $.fn.overlay = function(){
		console.log('overlay fn');
    };
    $.overlay = function(){
		console.log('overlay');
    };
    $.overlay.remix = function(){
		console.log('remix');
    };
    $(document).ready(function () {
		$('.overlay').each(function(){
			//overlay.init($(this));
			$(this).overlay('init');
		});
		console.log(detect.device);
		console.log(detect.agent);
		console.log(detect.iphone());
		console.log(detect.ipad());
		console.log(detect.ipod());
		console.log(detect.ios());
		console.log(detect.android());
        console.log(detect.win());
        console.log(detect.bb());
		console.log(detect.mobile());
		console.log(detect.device);
    });
	//from js
	//overlay.init();

	//html
	//<a href="/Manage-Groups/Add-Users/" class="add_links overlay" data-element="overlay_add_users" data-rounded="0px" data-width="640px"
	//data-height="700px" data-class="add_users_overlay" data-type="external" data-params="groupId:1891,isAdminView:true" data-httpmethod="POST" data-callback="callme">add</a>
})(jQuery);