/************************************************************
Start Overlay Script		
************************************************************/
jQuery(document).ready(function()
{
	if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
	{
		$("#modal_bg").css("top",$(window).scrollTop());
	};
	if(typeof (window['simpleOverlay'])=='undefined')
		simpleOverlay=new overlay();
});
function overlay()
{
	this.start=function()
	{
		var overlay_defaults={}
		return set_defaults(overlay_defaults);
	}
	this.start_with_options=function(overlay_defaults)
	{
		return set_defaults(overlay_defaults);
	}
	this.show=function(e,width,height,title,center)
	{
		if($("#modal_bg").length>0)
		{
			$('#modal_bg').remove();
			$('.overlay_holder').hide();
			$(".error_type").each(function()
			{
				$(this).removeAttr("style");
			});
			$(".overlay_master_content").addClass("overlay_content").show();
			$(".success_message").removeClass("overlay_content").hide();
		}
		var myValues=$('body').width();
		var myWidth=(Number(myValues)-Number(width));
		var myNum=myWidth/2;

		if(center==true)
		{
			var myValuesHeight=$(window).height();
			var myHeight=(Number(myValuesHeight)-Number(height));
			var myNumHeight=myHeight/2;
		}

		$('#modal_bg').attr('display','none');
		$("<div/>",{
			id: "modal_bg",
			css: {
				'width': $(window).width(),
				'height': $(window).height()
			}
		}).appendTo("body");
		$('#modal_bg').fadeTo('fast','0.50');
		if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
		{
			$("#modal_bg").css("top",$(window).scrollTop());
		};
		if($("#overlay_bar").length>0)
		{
			$("#overlay_bar").remove();
			if(title!=""||title!=undefined||title!=null)
			{
				$("<div/>",{
					id: "overlay_bar",
					html: '<h5>'+title+'</h5><a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
				}).prependTo("#"+e);
			} else
			{
				$("<div/>",{
					id: "overlay_bar",
					html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
				}).prependTo("#"+e);
			}
		} else
		{
			$("<div/>",{
				id: "overlay_bar",
				html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
			}).prependTo("#"+e);
		}
		$(".overlay_close").click(function()
		{
			$(".main_overlay").fadeOut();
			$("#"+e).fadeOut();
			$('#modal_bg').hide();
		})
		$('#modal_bg').click(function()
		{
			$(".main_overlay").fadeOut();
			$("#"+e).fadeOut();
			$('#modal_bg').hide();
		})
		$('div#errorsOccured').hide();
		$("#"+e).hide();
		$("#"+e).fadeTo("slow",1);
		$("#"+e).show();
		$("#"+e).css('left',myNum);
		$("#"+e).css('width',width);
		if(center==true)
		{
			$("#"+e).css('top',myNumHeight+$(window).scrollTop());
		} else
		{
			$("#"+e).css('top',25+$(window).scrollTop());
		}
		$("#"+e).addClass('main_overlay');
		reset_multi_user_form();
	}
	var set_defaults=function(overlay_defaults)
	{
		var master_overlay_debug=overlay_defaults.debug==undefined?false:overlay_defaults.debug;
		var master_overlay_width=overlay_defaults.width==undefined?'500':overlay_defaults.width;
		var master_overlay_height=overlay_defaults.height==undefined?'400':overlay_defaults.height;
		var master_overlay_element=overlay_defaults.element==undefined?"overlay":overlay_defaults.element;
		var master_overlay_class=overlay_defaults.overlay_class==undefined?".overlay":overlay_defaults.overlay_class;
		var master_overlay_how=overlay_defaults.how==undefined?"fade":overlay_defaults.how;
		var master_overlay_body_close=overlay_defaults.body_close==undefined?true:overlay_defaults.body_close;
		var master_top=overlay_defaults.top==undefined?30:overlay_defaults.top;
		var master_center=overlay_defaults.center==undefined?false:overlay_defaults.center;
		var master_fade_amount=overlay_defaults.fade_amount==undefined?'0.50':overlay_defaults.fade_amount;
		var master_fade_speed=overlay_defaults.fade_speed==undefined?'fast':overlay_defaults.fade_amount;
		var master_overlay_header=overlay_defaults.overlay_header==undefined?false:overlay_defaults.overlay_header;
		var master_overlay_header_content=overlay_defaults.overlay_header_content==undefined?'test':overlay_defaults.overlay_header_content;
		var master_overlay_auto_scroll=overlay_defaults.auto_scroll==undefined?true:overlay_defaults.auto_scroll;

		var watcher=function()
		{
			$(master_overlay_class).each(function()
			{
				$(this).click(function()
				{
					master_overlay_element=$(this).attr('lang');
					show_certain($(this).attr('lang'),$(this).attr('title'));
				})
			});
			$(".overlay_close").click(function()
			{
				$(".main_overlay").fadeOut();
				close();
			})
		}

		var resize=function()
		{
			$(window).resize(function()
			{
				reposition();
			})
		}
		var scroll=function()
		{
			$(window).scroll(function()
			{
				reposition();
			})
		}
		var reposition=function()
		{
			$("#modal_bg").css('width',$(window).width());
			$("#modal_bg").css('height',$(window).height());
			var myValues=$('body').width();
			var myWidth=myValues-master_overlay_width;
			var myNum=myWidth/2;
			$(".overlay_close").click(function()
			{
				$(".main_overlay").fadeOut();
				close();
			})
			if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
			{
				$("#modal_bg").css("top",$(window).scrollTop());
			};
			if(master_overlay_body_close==true)
			{
				$('#modal_bg').click(function()
				{
					$(".main_overlay").fadeOut();
					close();
				})
			}
			if(master_center==true)
			{
				var myValuesHeight=$(window).height();
				var myHeight=(Number(myValuesHeight)-Number(master_overlay_height));
				var myNumHeight=myHeight/2;
			}
			if(master_overlay_how=='fade')
			{
				$("#"+master_overlay_element).css('left',myNum);
				if(master_center==true)
				{
					$("#"+master_overlay_element).css('top',myNumHeight+$(window).scrollTop());
				} else
				{
					$("#"+master_overlay_element).css('top',master_top+$(window).scrollTop());
				}
			} else if(master_overlay_how=='tween')
			{
				if(master_center==true)
				{
					var repo_top=(myNumHeight+$(window).scrollTop());
				} else
				{
					var repo_top=(master_top+$(window).scrollTop());
				}
				$("#"+master_overlay_element).animate({
					left: myNum,
					top: repo_top
				},150);
			}
		}
		var show_certain=function(e,title)
		{
			if($("#modal_bg").length>0)
			{
				$('#modal_bg').remove();
				$('.overlay_holder').hide();
				$(".error_type").each(function()
				{
					$(this).removeAttr("style");
				});
				$(".overlay_master_content").addClass("overlay_content").show();
				$(".success_message").removeClass("overlay_content").hide();
			}
			var myValues=$('body').width();
			var myWidth=(Number(myValues)-Number(master_overlay_width));
			var myNum=myWidth/2;

			if(master_center==true)
			{
				var myValuesHeight=$(window).height();
				var myHeight=(Number(myValuesHeight)-Number(master_overlay_height));
				var myNumHeight=myHeight/2;
			}

			$('#modal_bg').attr('display','none');
			$("<div/>",{
				id: "modal_bg",
				css: {
					'width': $(window).width(),
					'height': $(window).height()
				}
			}).appendTo("body");
			$('#modal_bg').fadeTo(master_fade_speed,master_fade_amount);
			if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod')
			{
				$("#modal_bg").css("top",$(window).scrollTop());
			};
			if($("#overlay_bar").length>0)
			{
				$("#overlay_bar").remove();
				if(master_overlay_header)
				{
					$("<div/>",{
						id: "overlay_bar",
						html: '<h5>'+title+'</h5><a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
					}).prependTo("#"+e);
				} else
				{
					$("<div/>",{
						id: "overlay_bar",
						html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
					}).prependTo("#"+e);
				}
			} else
			{
				$("<div/>",{
					id: "overlay_bar",
					html: '<a href="#nogo" class="overlay_close"><img src="../../ui/images/enterprise_redesign/ent_re_icon_close.gif" alt=""/></a>'
				}).prependTo("#"+e);
			}
			$(".overlay_close").click(function()
			{
				$(".main_overlay").fadeOut();
				close();
			})
			if(master_overlay_body_close==true)
			{
				$('#modal_bg').click(function()
				{
					$(".main_overlay").fadeOut();
					close();
				})
			}
			$('div#errorsOccured').hide();
			if(master_overlay_how=='fade')
			{
				$("#"+e).hide();
				$("#"+e).fadeTo("slow",1);
				$("#"+e).show();
				$("#"+e).css('left',myNum);
				$("#"+e).css('width',master_overlay_width);
				if(master_center==true)
				{
					$("#"+e).css('top',(myNumHeight+$(window).scrollTop()));
				} else
				{
					$("#"+e).css('top',master_top+$(window).scrollTop());
				}
			} else if(master_overlay_how=='tween')
			{
				$("#"+e).css('opacity','1');
				$("#"+e).css('width','1px');
				$("#"+e).css('height','1px');
				$("#"+e).css('overflow','hidden');
				$("#"+e).hide();
				$("#"+e).css('left',myNum);
				if(master_center==true)
				{
					$("#"+e).css('top',myNumHeight);
				} else
				{
					$("#"+e).css('top',master_top+$(window).scrollTop());
				}
				$("#"+e).css('overflow','visible');
				$("#"+e).animate({
					width: master_overlay_width,
					height: master_overlay_height
				},1000);
			}
			$("#"+e).addClass('main_overlay');
			reset_multi_user_form();
		}
		var close=function()
		{
			if(master_overlay_debug==true) { alert('closing!'); }
			if(master_overlay_how=='fade')
			{
				if(master_overlay_debug==true) { alert('fade out!'); }
				$("#"+master_overlay_element).fadeOut();
			} else if(master_overlay_how=='tween')
			{
				if(master_overlay_debug==true) { alert('tween!'); }
				$("#"+master_overlay_element).fadeOut();
			}
			$('#modal_bg').hide();
		}
		var close_certain=function(e)
		{
			if(master_overlay_debug==true) { alert('closing!'); }
			if(master_overlay_how=='fade')
			{
				if(master_overlay_debug==true) { alert('fade out!'); }
				$("#"+e).fadeOut();
			} else if(master_overlay_how=='tween')
			{
				if(master_overlay_debug==true) { alert('tween!'); }
				$("#"+e).fadeOut();
			}
			$('#modal_bg').hide();
		}
		watcher();
		resize();
		if(master_overlay_auto_scroll==true)
		{
			scroll();
		}
	}
}
/************************************************************
End Overlay Script		
************************************************************/