var sort_what;
var sort_direction;
var left_alignment = false;
var report_open = false;
function is_mobile() {
    if ((navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
        //if ipad
        return true;
    } else {
        //if not ipad
        return false;
    }
}
function sort(what,direction){
	//down = gray-white , up = white-gray			
	if(sort_what == undefined || sort_what == null || what == undefined || what == null){
		what = ldc.vars.is_special_author;
		direction = 0;	
	}
	$("#royalty_report th").each(function(){
		$(this).removeClass("current-sort");
		$(this).find("span").removeClass("sprite dbl-arrow-gray-white").removeClass("sprite dbl-arrow-white-gray").addClass("sprite dbl-arrow-gray");
		if($(this).index()==what){
			if(direction==0){
				$(this).find("span").removeClass("sprite dbl-arrow-gray").removeClass("sprite dbl-arrow-gray-white").addClass("sprite dbl-arrow-white-gray");
			}else if(direction==1){
				$(this).find("span").removeClass("sprite dbl-arrow-gray").removeClass("sprite dbl-arrow-white-gray").addClass("sprite dbl-arrow-gray-white");
			}
			$(this).addClass("current-sort");					
		}
	});
	var sort_val = what;
	var sorter_direction = direction;
	$("#royalty_report").trigger("update"); 
	var sorting = [[sort_val,sorter_direction]]; 
	$("#royalty_report").trigger("sorton",[sorting]);
	(direction==0)? $("#royalty_report th").eq(what).removeClass("sortdesc").addClass("sortasc").addClass("visited") : $("#royalty_report th").eq(what).removeClass("sortasc").addClass("sortdesc").addClass("visited");
	return false; 	
}
function sortable_headers(header, direction, sort_what, sort_direction){
	$("#royalty_report th").each(function(){
		if($.trim($(this).text())==header){
			$(this).addClass("current-sort");
		}
	});
	sort(sort_what, sort_direction);
}
function align_page(direction_type){
	var royalty_width = ($(".container_19").width()-$("#dlPeriods").width());
	var royalty_diff = ($("#royalty_report").width() - royalty_width);
	//alert($(window).width());
    //alert(($("#royalty_report").width() + $("#dlPeriods").width()));
	if (direction_type == "left") {
		if($(window).width() > 1060){
		    if (($("#royalty_report").width() + $("#dlPeriods").width()) > $(window).width()) {
				$("#master-page").css("width", (($("#royalty_report").width() + $("#dlPeriods").width()) +100));
            } else {
				$("#master-page").css("width", "100%");
			}			
			$("#eyebrow,.curve,#footer-legal,.container_19").css({'margin-left':'50px','margin-right':'0px'});	
		}else{
			if(($("#royalty_report").width() + $("#dlPeriods").width()) > $(window).width()){
                $("#master-page").css("width", (($("#royalty_report").width() + $("#dlPeriods").width()) + 100));
                $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': '50px', 'margin-right': '0px' });
			} else {
			    $("#master-page").css("width", '100%');
			    $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': 'auto', 'margin-right': 'auto' });
		    }
        }
		left_alignment = true;
    } else {
		$("#master-page").css("width", "100%");
		$("#eyebrow,.curve,#footer-legal,.container_19").css({'margin-left':'auto','margin-right':'auto'});
		left_alignment = false;
    }
}        
var reportData;
var reportMonth;
var page;
var el_text = 'Release Date';
        
function navigate(newFilter,newMonth, findstart){ 
	$(".royaltyStatement").empty();
	$('<div id="loading"><img src="'+ldc.vars.please_wait_image+'" alt="" /></div>').appendTo(".royaltyStatement");
	jQuery.ajax(
	{
		type: "POST",
		url: parseSecureUrl(ldc.vars.monthly_royalty_json) + "?periodID=" + newFilter + "&findstart=" + findstart,
		success: function(result) {
			if (result != null) {					
				reportData = (typeof(result) == 'string' ? jQuery.parseJSON(result) : result);
				reportMonth = reportData.periodDate;
				renderReport(reportData,reportMonth);	
				toggleDateNav(reportData.periodID);
			}
		},
		error: function() { jQuery('#serviceError').show(); }
	}
	);		
};
function generatePDF()
{
	document.location = parseSecureUrl(ldc.vars.monthly_royalty_pdf) + "?periodID=" + reportData.periodID + "&rnd=" + (new Date()).getTime();
	return false;
};		
function toggleDateNav(ctlid)
{
	jQuery('.datenav').each(function() { 
		jQuery(this).css({'color':'#0E628C', 'cursor':'pointer', 'font-weight':'normal'});
	});
jQuery('#nav_' + ctlid).css({ 'color': 'black', 'cursor': 'default', 'font-weight': 'bold' });
}		
function ToggleExtendedView()
{
	(extendedReport == true) ? extendedReport=false : extendedReport=true;															
	if( extendedReport == true)
	{
		$("#expander_text").text("collapse royalty details");
		jQuery('#extendCtl').removeClass("expand").addClass("collaspe");	
		align_page("left");	
		$("#royalty_report .extended").show();
		$("#royalty_report .non_extended").hide();
		report_open = true;
	}
	else 
	{
		$("#expander_text").text("expand royalty details");
		jQuery('#extendCtl').removeClass("collaspe").addClass("expand");	
		align_page("center");
		$("#royalty_report .extended").hide();
		$("#royalty_report .non_extended").show();
		report_open = false;		
	}
}
var extendedReport = false;
var renderReport = function (data, period) {
    var html = "<h2>Monthly Statement: " + period + "</h2>";

    var extended;
    if (!is_mobile()) {
        if (extendedReport == true) {
            html += '<a href="javascript: void(0)" class="expander collaspe" id="extendCtl" onclick="ToggleExtendedView();"><div class="expander_front hide">&nbsp;</div><div id="expander_text">collapse royalty details</div><div class="expander_back hide">&nbsp;</div></a>';
        }
        else {
            html += '<a href="javascript: void(0)" class="expander expand" id="extendCtl" onclick="ToggleExtendedView();"><div class="expander_front hide">&nbsp;</div><div id="expander_text">expand royalty details</div><div class="expander_back hide">&nbsp;</div></a>';
        }
        html += '<div id="download"><a href="javascript: void(0)" onclick="generatePDF();">download PDF</a></div>';
        extended = 'extended';
    } else {
        extended = '';
        html += '<div id="download_ipad"><a href="javascript: void(0)" onclick="generatePDF();">download PDF</a></div>';
        $("#master-page").css("width", '1742px');
        $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': '32px', 'margin-right': '32px' });
    }
    html += "<table border='0' cellpadding='0' cellspacing='' id='royalty_report'><thead><tr>";
    if (ldc.vars.special_author == "True") {
        html += "<th class='course_title_header'><div class='course_title_deke oneline'>Course <span class='sprite dbl-arrow-gray'>&nbsp;</span></div></th>";
        html += "<th class='" + extended + "'>Course ID <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='current-sort sortasc visited'>Release<br />Date <span class='sprite dbl-arrow-white-gray'>&nbsp;</span></th>";
        html += "<th>Total<br />Views <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='oneline'>Usage % <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Revenue<br />Base % <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Tier 1 % <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Tier 2 % <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Total OTL<sup>1</sup><br />Royalties <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Secondary<br />Royalties<sup>2</sup> <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='oneline'>DVD Sales <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>DVD<br />Royalty % <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Other<br />Royalties <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th>Total Current<br />Month Payment <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th>Earnings<br />to Date <span class='sprite dbl-arrow-gray'>&nbsp;</span></th></tr></thead>";
    }
    else {
        html += "<th class='course_title_header'><div class='course_title oneline'>Course <span class='sprite dbl-arrow-gray'>&nbsp;</span></div></th>";
        html += "<th class='current-sort sortasc visited'>Release Date <span class='sprite dbl-arrow-white-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Course ID <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>OTL<br />Royalty % <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Total OTL<sup>1</sup><br />Royalties <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + " oneline'>DVD Sales <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>DVD<br />Royalty % <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>DVD<br />Royalties <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th>Total Current<br />Month Earnings <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th>Total<br />Advances <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th>Current Month<br />Payment<sup>2</sup> <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th class='" + extended + "'>Remaining Advance<br />Balance <span class='sprite dbl-arrow-gray'>&nbsp;</span></th>";
        html += "<th>Earnings<br />to Date <span class='sprite dbl-arrow-gray'>&nbsp;</span></th></tr></thead>";
    }
    var paymentProcessed = false;
    html += "<tbody>";

    if (data.details && data.details.length > 0) {
        jQuery.each(data.details, function (index) {
            html += "<tr" + (data.details[index].isactive ? "" : " class='" + extended + "'") + ">";
            if (ldc.vars.special_author == "True") {
                html += "<td class='course_title_header'>" + data.details[index].course + "</td>";
                html += "<td class='" + extended + "'>" + data.details[index].productid + "</td>";
                html += "<td>" + data.details[index].courseReleaseDate + "</td>";
                html += "<td>" + data.details[index].totalViews + "</td>";
                html += "<td class='tcenter'>" + data.details[index].usagePercent + "</td>"; // Useage %
                html += "<td class='" + extended + " tcenter'>" + data.details[index].revenuePercent + "</td>"; // revenu base %
                html += "<td class='" + extended + " tcenter'>" + data.details[index].tier1Percent + "</td>"; // tier1 %
                html += "<td class='" + extended + " tcenter'>" + data.details[index].tier2Percent + "</td>"; // tier2 %
                html += "<td class='" + extended + " tright'>" + data.details[index].OTLRoyaltiesDeke + "</td>"; //total otl royalties 
                html += "<td class='" + extended + " tright'>" + data.details[index].OTLRoyaltiesDekeSecondary + "</td>"; //total otl royalties
                html += "<td class='tright'>" + data.details[index].cd_sales + "</td>"; //cd sales
                html += "<td class='" + extended + " tcenter'>" + data.details[index].cd_rate + "</td>"; //cd rate
                html += "<td class='" + extended + " tright'>" + data.details[index].RoyaltiesDekeOther + "</td>"; //other royalties
                html += "<td class='highlighted_column tright'>" + data.details[index].currMonthPayment + "</td>"; // Current Month Payment					
                html += "<td class='tright'>" + data.details[index].totalEarningsToDate + "</td>";  //total earnings to date															
            }
            else {
                html += "<td class='course_title_header'>" + data.details[index].course + "</td>";
                html += "<td>" + data.details[index].courseReleaseDate + "</td>";
                html += "<td class='" + extended + "'>" + data.details[index].productid + "</td>";
                html += "<td class='" + extended + " tcenter'>" + data.details[index].tier1Percent + "</td>"; // Royalty percent? 
                html += "<td class='" + extended + " tright'>" + data.details[index].otl_earning + "</td>"; //total otl royalties
                html += "<td class='" + extended + " tright'>" + data.details[index].cd_sales + "</td>"; //cd sales
                html += "<td class='" + extended + " tcenter'>" + data.details[index].cd_rate + "</td>"; //cd rate
                html += "<td class='" + extended + " tright'>" + data.details[index].cd_earning + "</td>"; //cd royalties
                html += "<td class='highlighted_column tright'>" + data.details[index].currMonthEarnings + "</td>"; //total current month earnings			
                html += "<td class='tright'>" + data.details[index].advPayment + "</td>"; // total advances													
                html += "<td class='highlighted_column tright'>" + data.details[index].currMonthPayment + "</td>"; // Current Month Payment					
                html += "<td class='" + extended + " tright'>" + data.details[index].remainingAdvBalance + "</td>"; //remaining advance balance?
                html += "<td class='tright'>" + data.details[index].totalEarningsToDate + "</td>";  //total earnings to date															
            }
            html += "</tr>";
            if (data.details[index].checkNumber.length > 0)
                paymentProcessed = true;
        });

        html += "</tbody><tfoot><tr class='total_row'>";

        if (ldc.vars.special_author == "True") {
            html += "<td class='royalty_total_header'>Total</td>";
            html += "<td colspan='8' class='royalty_total " + extended + " tright'>" + data.totalOTLRoyaltiesDeke + "</td>";
            html += "<td colspan='3' class='royalty_total non_extended tright'></td>";
            html += "<td class='royalty_total " + extended + " tright'>" + data.totalOTLRoyaltiesDekeSecondary + "</td>";
            html += "<td class='royalty_total tright'>" + data.totalCDSales + "</td>";
            html += "<td class='royalty_total " + extended + "'>&nbsp;</td>";
            html += "<td class='royalty_total " + extended + " tright'>" + data.totalRoyaltiesDekeOther + "</td>";
            html += "<td class='royalty_total tright'>" + data.currentMonthPayments + "</td>";
            html += "<td class='royalty_total tright'>" + data.totalEarningsToDateTotal + "</td></tr>";
        }
        else {
            html += "<td class='royalty_total_header'>Total</td>";
            html += "<td class='royalty_total " + extended + "' colspan='3'>&nbsp;</td>";
            html += "<td class='royalty_total non_extended'>&nbsp;</td>";
            html += "<td class='royalty_total " + extended + " tright'>" + data.totalOTLRoyalty + "</td>";
            html += "<td class='royalty_total " + extended + " tright'>" + data.totalCDSales + "</td>";
            html += "<td class='royalty_total " + extended + "'>&nbsp;</td>";
            html += "<td class='royalty_total " + extended + " tright'>" + data.totalCDRoyalty + "</td>";
            html += "<td class='royalty_total tright'>" + data.currentMonthTotalEarnings + "</td>";
            html += "<td class='royalty_total tright'>" + data.totalAdvances + "</td>";
            html += "<td class='royalty_total tright'>" + data.currentMonthPayments + "</td>";
            html += "<td class='royalty_total " + extended + " tright'>" + data.totalRemainingAdvanceBalance + "</td>";
            html += "<td class='royalty_total tright'>" + data.totalEarningsToDateTotal + "</td></tr>";
        }
        html += "</tfoot>";
        html += "</table>";

        html += '<div id="royalty_info">';
        html += '<div id="instructions">';
        html += '<ol>';
        html += '<li>OTL: lynda.com Online Training Library&reg;</li>';
        html += '<li>';
        html += (ldc.vars.special_author == "True") ? "Secondary Royalty: Where views are tracked and/or reported by a third-party vendor, but use by distinctive user may not be determinable." : "Current Month Payment: Total current month earnings less any previous advance balance; amount you will receive by check or direct deposit.";
        html += '</li>';
        html += '</ol>';
        html += '</div>';
        html += '<div id="payment_type">';
        html += '<table cellspacing="0" cellpadding="0" border="0" id="payment_info">';
        html += '<tr>';
        html += '<td><span>Payment date:</span></td>';
        html += '<td>' + data.paymentDate + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td><span>Payment type:</span></td>';
        html += '<td>' + data.maxCheckNumber + '</td>';
        html += '</tr>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
    }
    else if (data.periodPublished) {
        //'monthly_royalty_sample': ldc.vars.monthly_royalty_sample
        html = "<div class='notification'><p>There are no royalty statements for this month because your course was not published in this month.  Please view the <a href='" + ldc.vars.monthly_royalty_sample + "'>sample royalty statement</a> to see what your statement will look like.</p></div>";
    }
    else {
        html = "<div class='notification'><p>The royalty statement for this month has not been published.</p></div>";
    }

    jQuery('.royaltyStatement').html(html);
    highlight_rows();
    if (!is_mobile()) {
        if (extendedReport == true) {
            $("#royalty_report .extended").show();
            $("#royalty_report .non_extended").hide();
        }
        else {
            $("#royalty_report .extended").hide();
            $("#royalty_report .non_extended").show();
        }
        jQuery('#extendCtl').fadeTo("fast", 0.60).mouseenter(function () { jQuery(this).fadeTo("fast", 1.0); }).mouseleave(function () { jQuery(this).fadeTo("fast", 0.60); });
    } else {
        $("#royalty_report .non_extended").hide();
    }
    $("#royalty_report").tablesorter({
        textExtraction: function (o) {
            var c = o.innerHTML;
            if (c.charAt(0) == '(' && c.charAt(1) == '$' && c.charAt(c.length - 1) == ')') { return '$-' + c.substr(2, c.length - 3).replace(',', ''); }
            else { return c.replace(',', ''); }
        }
    });
    $("#royalty_report th").each(function () {
        $(this).click(function () {
            $("#royalty_report th").each(function () {
                $(this).removeClass("current-sort");
                $(this).find("span").removeClass("sprite dbl-arrow-gray-white").removeClass("sprite dbl-arrow-white-gray").addClass("sprite dbl-arrow-gray");
            });
            $(this).addClass("current-sort").find("span").addClass("sprite dbl-arrow-white-gray");
            sort_direction = 0;
            sort_what = $(this).index();
            // sort_direction - 0 = ASC , 1 = DESC	
            //headerSortUp = DESC
            //headerSortDown = ASC
            //down = gray-white , up = white-gray
            if ($(this).hasClass('visited')) {
                //if you've been here   
                if ($.trim(el_text) == $.trim($(this).text())) {
                    //clicking on same item again
                    if ($(this).hasClass('sortasc')) {
                        $(this).find("span").removeClass("sprite dbl-arrow-gray").removeClass("sprite dbl-arrow-white-gray").addClass("sprite dbl-arrow-gray-white");
                        $(this).addClass('sortdesc').removeClass('sortasc');
                        sort_direction = 1;
                    } else {
                        $(this).find("span").removeClass("sprite dbl-arrow-gray").removeClass("sprite dbl-arrow-gray-white").addClass("sprite dbl-arrow-white-gray");
                        $(this).addClass('sortasc').removeClass('sortdesc');
                        sort_direction = 0;
                    }
                } else {
                    //clicking on a different item
                    if ($(this).hasClass('sortasc')) {
                        $(this).find("span").removeClass("sprite dbl-arrow-gray").removeClass("sprite dbl-arrow-gray-white").addClass("sprite dbl-arrow-white-gray");
                        $(this).removeClass('sortdesc').addClass('sortasc');
                        sort_direction = 0;
                    } else {
                        $(this).find("span").removeClass("sprite dbl-arrow-gray").removeClass("sprite dbl-arrow-white-gray").addClass("sprite dbl-arrow-gray-white");
                        $(this).removeClass('sortasc').addClass('sortdesc');
                        sort_direction = 1;
                    }
                }
            } else {
                //if you are new
                $(this).find("span").removeClass("sprite dbl-arrow-gray").removeClass("sprite dbl-arrow-white-gray").addClass("sprite dbl-arrow-gray-white");
                $(this).addClass('visited').removeClass('sortdesc').addClass('sortasc');
                sort_direction = 0;
            }
            sort(sort_what, sort_direction);
            el_text = $(this).text();
        });
    });
    royalty_header = $.trim($("#royalty_report th.current-sort").text());
    royalty_direction = $("#royalty_report th.current-sort").attr('class');
    sortable_headers(royalty_header, royalty_direction, sort_what, sort_direction);

};
var showNoResults = function() {
	jQuery('.royaltyStatement').html("<div class='not_published'>Your current month's royalty statement has not yet been published. We aim to have them available by the fifth business day of the new month so it will be available soon. Thank you for your patience.</div>");
};
var showToggle = function(id)
{
	jQuery(id).parent().find('table').toggle();
			
	(jQuery(id).hasClass('toggleDiscountSelected')) ? jQuery(id).addClass('toggleDiscount').removeClass('toggleDiscountSelected') : jQuery(id).addClass('toggleDiscountSelected').removeClass('toggleDiscount');
};
function highlight_rows(){
	$("#royalty_report tr").each(function()
	{
		if(!$(this).hasClass("total_row")){
			$(this).mouseenter(function()
			{
				$(this).find("td").css("background-color","#EDEAE2");
			});
			$(this).mouseleave(function()
			{
				$(this).find("td").each(function()
				{
					($(this).hasClass("highlighted_column")) ? $(this).css("background-color","#e8f2ff") : $(this).css("background-color","#ffffff");
				});
			});				
		}
	});
}
$(document).ready(function () {
    if (ldc.vars.start_period == null) {
        renderReport({ "periodPublished": false }, '');
    }
    else {
        navigate(ldc.vars.start_period, ldc.vars.start_date, 'true');
    }
    if (is_mobile()) {
        window.onorientationchange = function () {
            //$("#viewport").attr("content", "width=device-width, maximum-scale = 1.0, initial-scale= 1.0");
            if (orientation == 0 || orientation == 180) {
                //alert('Portrait Mode, Home Button bottom');
                //alert('Portrait Mode, Home Button top');
                $('#section-sitefeedback-ipad').css('right', '-150px');
            }
            else if (orientation == 90 || orientation == -90) {
                //alert('Landscape Mode, Home Button right');
                //alert('Landscape Mode, Home Button left');
                $('#section-sitefeedback-ipad').css('right', '100px');
            } 
        };
    }
    $(".collasped_title").each(function () {
        $(this).click(function () {
            ($(this).hasClass("open")) ? $(this).removeClass("open") : $(this).addClass("open");
            ($(this).next().css("display") == "none") ? $(this).next().show() : $(this).next().hide();
        });
    });
    if (!is_mobile()) {
        $(window).resize(function () {
            var my_left = jQuery('.container_19').offset().left;
            var my_header_left = jQuery('.curve').offset().left;
            if (($("#royalty_report").width() + $("#dlPeriods").width()) > $(window).width()) {
                if ($(window).width() < 1060) {
                    $("#footer-legal,.container_19").css({ 'margin-left': my_left, 'margin-right': '0px' });
                    $("#eyebrow,.curve").css({ 'margin-left': my_header_left, 'margin-right': '0px' });
                    $("#master-page").css("width", (($("#royalty_report").width() + $("#dlPeriods").width()) + 100));
                } else {
                    $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': '50px', 'margin-right': '0px' });
                }
            } else {
                $("#master-page").css("width", "100%");
                if (report_open == true) {
                    $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': '50px', 'margin-right': '0px' });
                } else {
                    $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': 'auto', 'margin-right': 'auto' });
                }
            }
        });
        $(window).scroll(function () {
            var my_left = jQuery('.container_19').offset().left;
            var my_header_left = jQuery('.curve').offset().left;
            if (($("#royalty_report").width() + $("#dlPeriods").width()) > $(window).width()) {
                $("#master-page").css("width", (($("#royalty_report").width() + $("#dlPeriods").width()) + 100));
                if ($(window).width() < 1060) {
                    $("#footer-legal,.container_19").css({ 'margin-left': my_left, 'margin-right': '0px' });
                    $("#eyebrow,.curve").css({ 'margin-left': my_header_left, 'margin-right': '0px' });
                    $("#master-page").css("width", (($("#royalty_report").width() + $("#dlPeriods").width()) + 100));
                }
            } else {
                $("#master-page").css("width", "100%");
                if (report_open == true) {
                    $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': '50px', 'margin-right': '0px' });
                } else {
                    $("#eyebrow,.curve,#footer-legal,.container_19").css({ 'margin-left': 'auto', 'margin-right': 'auto' });
                }
            }
        });
    } else {
        $("#section-sitefeedback").removeAttr('id').attr('id', 'section-sitefeedback-ipad');
        //set it intially , remove bottom and set top
        //$('#section-sitefeedback').css('bottom', 'auto');
        $('html, body').animate({
            scrollTop: '1'
        }, 150, function () {
            $('#section-sitefeedback-ipad').css('top', ((window.pageYOffset + window.innerHeight - 20) + 'px'));
        });

        //move it on scroll
        $(window).scroll(function () {
            //alert("Page Y = " + window.pageYOffset + " | Inner Height: " + window.innerHeight + " | Total: " + (((window.pageYOffset + window.innerHeight) - 20) + 'px') + "right: " + (window.pageXOffset + 100) + 'px');
            $('#section-sitefeedback-ipad').css('top', (((window.pageYOffset + window.innerHeight) - 20) + 'px'));
        });
    }
});