var toggled = true;
var clickable = true;
var default_message = true;
var valid_username = false;
var valid_password = false;
var valid_email = false;
function clear(what){
    //alert(what);
    jQuery(".inline").html('').removeClass("inline_success").removeClass("inline_error");
    jQuery(".errorItem").removeClass("errorItem");
    switch(what)
    {
    case 'username':
        jQuery("#username").val('');
        break;
    case 'password':
        jQuery("#oldPassword,#newPassword,#newPasswordConfirm").val('');
        break;
    case 'email':
        jQuery("#email").val('');
        break;
    default:
        jQuery("#username,#newPassword,#newPasswordConfirm,#email").val('');
    }
}
function cancel_toggle(){  
    clickable = false;  
    jQuery('#default_message').show();
    jQuery(".editible").find("li").each(function(){
        jQuery(this).find(".form").hide();
        jQuery(this).find(".edit").show();
        jQuery(this).removeClass('edit_row').removeClass('edit_row_highlight');  
    });
    jQuery('#section-head').css('margin-bottom','27px');
    clear($('#current_form').val());
}
jQuery(document).ready(function () {
    jQuery('#section-head').css('margin-bottom', '27px');
    jQuery(".form").find("input").each(function () {
        $(this).click(function (event) {
            event.stopPropagation();
        });
        $(this).blur(function () {
            var current = $("#current_form").val();
            var inputs = getFormInputs();
            Validate(inputs, current, $(this).attr('id'));
        });
    });
    jQuery(".editible").find("li").not('.no_edit').each(function () {
        jQuery(this).mouseenter(function () {
            if (!jQuery(this).hasClass('edit_row')) {
                jQuery(this).addClass('edit_row_highlight');
            }
        });
        jQuery(this).mouseleave(function () {
            jQuery(this).removeClass('edit_row_highlight');
        });
        jQuery(this).click(function () {
            jQuery("#toggled").val((jQuery(this).find(".form").attr("id").substr(5)));
            jQuery('#section-head').css('margin-bottom', '27px');
            $("#feedbackMsgs").hide();
            jQuery('#notification,#notification_email,#notification_password').hide();
            jQuery(".editible").find("li").not('.no_edit').each(function () {
                if (jQuery(this).hasClass('edit_row')) {
                    jQuery(this).find(".form").hide();
                    jQuery(this).find(".edit").show();
                    jQuery(this).removeClass('edit_row').removeClass('edit_row_highlight');
                }
            });
            if (toggled && clickable) {
                jQuery(this).find(".form").show();
                jQuery(this).find(".edit").hide();
                jQuery(this).addClass('edit_row');
                if (jQuery(this).hasClass('show_username') && jQuery("#feedbackMsgs").css('display') != "block") {
                    jQuery('#notification').show();
                    jQuery('#notification_email,#notification_password').hide();
                } else if (jQuery(this).hasClass('show_password') && jQuery("#feedbackMsgs").css('display') != "block") {
                    jQuery('#notification_password').show();
                    jQuery('#notification,#notification_email').hide();
                } else if (jQuery(this).hasClass('show_email') && jQuery("#feedbackMsgs").css('display') != "block") {
                    jQuery('#notification_email').show();
                    jQuery('#notification,#notification_password').hide();
                } else {
                    jQuery('#notification,#notification_password').hide();
                }
                if ($(this).find('.form').attr('id') == "form_username") {
                    jQuery('#current_form').val('username');
                } else if (jQuery(this).find('.form').attr('id') == "form_password") {
                    jQuery('#current_form').val('password');
                } else if (jQuery(this).find('.form').attr('id') == "form_email") {
                    jQuery('#current_form').val('email');
                }
            }
            toggled = true;
            clickable = true;
        });
    });
}); 
var edit = function(){
	jQuery('.viewMode,#updateInfoLink').hide();
	jQuery('.editMode,#notification,#notification_password').show();
};
var cancel = function(){
	jQuery('.editMode,#feedbackMsgs,#notification,#notification_password').hide();
    jQuery('#default_message,.viewMode,#updateInfoLink').show();
	$(".label").removeClass('errorItem');
	$("#oldPassword,#newPassword,#newPasswordConfirm").val('');
};
var save = function (what) {
    jQuery("#toggled").val(what);
    var inputs = getFormInputs();
    var errMsgs = Validate(inputs, what);
    if (errMsgs.length > 0) {
        //jQuery('#feedbackMsgs').addClass('issueAlert').removeClass('successAlert').html(errMsgs).show();			
    }
    else {
        jQuery('#feedbackMsgs').hide();
        var submitData = null;
        switch (what) {
            case 'username':
                submitData = { 'Username': inputs.userName };
                break;
            case 'password':
                submitData = { 'OldPassword': inputs.oldPassword, 'Password': inputs.newPassword };
                break;
            case 'email':
                submitData = { 'Email': inputs.email };
                break;
        }
        jQuery.ajax({
            type: "POST",
            url: ldc.vars.account_url,
            data: submitData,
            success: function (errorCodes, what_errors) {
                if (errorCodes.length > 0) {
                    if (errorCodes == 'login-validation' || errorCodes == 'login-expired') {
                        window.location.reload(true);
                    }
                    else {
                        jQuery('#section-head').css('margin-bottom', '27px');
                        switch (jQuery("#toggled").val()) {
                            case 'username':
                                jQuery('#error_username').html(errorCodes);
                                $("#error_username").removeClass('inline_success').addClass('inline_error');
                                break;
                            case 'password':
                                if (errorCodes.indexOf('current password') == -1) {
                                    jQuery('#error_password').html(errorCodes).removeClass('inline_success').addClass('inline_error');
                                }
                                else {
                                    jQuery('#error_oldpassword').html(errorCodes).removeClass('inline_success').addClass('inline_error');
                                    jQuery('#spanOldPassword').addClass('errorItem');
                                }
                                break;
                            case 'email':
                                jQuery('#error_email').html(errorCodes);
                                $("#error_email").removeClass('inline_success').addClass('inline_error');
                                break;
                            default:
                        }
                    }
                } else {
                    jQuery("#error_username,#error_password,#error_email").removeClass('inline_success').removeClass('inline_error');
                    jQuery('#default_message').show();
                    jQuery('#spanUserNameView').html(inputs.userName);
                    jQuery('#spanEmailView').html(inputs.email);
                    switch (what) {
                        case 'username':
                            jQuery('#feedbackMsgs').html("<p>You have successfully changed your user name for both the Author Portal and the Online Training Library&reg;.</p>");
                            jQuery('#oldUserName').text(jQuery('input#username').val());
                            break;
                        case 'password':
                            jQuery('#feedbackMsgs').html("<p>You have successfully changed your password for both the Author Portal and the Online Training Library&reg;.</p>");
                            break;
                        case 'email':
                            jQuery('#feedbackMsgs').html("<p>You have successfully changed your email address for both the Author Portal and the Online Training Library&reg;.</p>");
                            jQuery('#oldEmail').text(jQuery('input#email').val());
                            break;
                        default:
                    }
                    jQuery('#section-head').css('margin-bottom', '12px');
                    jQuery('#spanEmailView').html(inputs.email);
                    jQuery('#feedbackMsgs').removeClass('issueAlert').addClass('successAlert').show();
                    $(".labels").removeClass('errorItem');
                    jQuery('.viewMode').show();
                    jQuery('.editMode').hide();
                    cancel_toggle();
                    clickable = true;
                    toggled = true;
                    jQuery('#updateInfoLink').show();
                    jQuery('#notification,#notification_password,#notification_email').hide();
                }
            }
        });
    }
};
var Validate = function (accountInfo, what, el) {
    if (el == undefined || el == null || el == '') {
        el = '';
    }
    var pwd = accountInfo.newPassword; var pwdConfirm = accountInfo.newPasswordConfirm;
    var oldPwd = accountInfo.oldPassword;
    var hasErrors = false;
    var errorMsgs = "";
    switch (what) {
        case 'username':
            if (accountInfo.userName.length == 0) {
                $("#error_username").html('Enter a new user name.').removeClass('inline_success').addClass('inline_error');
                errorMsgs += "Enter a new user name.";
                jQuery('#spanUsernameTxt').addClass("errorItem");
                hasErrors = true;
            }
            else if (accountInfo.userName == jQuery('#oldUserName').text()) {
                 jQuery("#error_username").text('This new user name matches your current user name.').removeClass('inline_success').addClass('inline_error');
                 errorMsgs += "This new user name matches your current user name.";
                 hasErrors = true;
            }
            else {
                $("#error_username").removeClass('inline_error');
                jQuery('#spanUsernameTxt').removeClass("errorItem");
                $("#error_username").html('');
            }
            break;
        case 'password':
            var pattern = ldc.vars.reg_exp;
            var regex = new RegExp(pattern);
            var default_data = function () {
                hasErrors = true;
                errorMsgs += "error message";
            };
            var is_ok = function (who, who_span) {
                $("#" + who).removeClass('inline_error').addClass('inline_success').html('');
                jQuery('#' + who_span).removeClass("errorItem");
            };
            var is_ok_no_icon = function (who, who_span) {
                $("#" + who).removeClass('inline_error').html('');
                jQuery('#' + who_span).removeClass("errorItem");
            };
            var has_error = function (who, who_span, error_message) {
                $("#" + who).removeClass('inline_success').addClass('inline_error').html(error_message);
                jQuery('#' + who_span).addClass("errorItem");
            };
            var password = function () {
                has_error('error_password', 'spanNewPassword', 'Enter a new password.');
                jQuery('#default_message').hide();
            };
            var password_criteria = function () {
                has_error('error_password', 'spanNewPassword', 'Must be at least six characters with letters and numbers.');
                jQuery('#default_message').hide();
            };
            var old_password = function () {
                has_error('error_oldpassword', 'spanOldPassword', 'Enter your current password.');
            };
            var password_confirm = function () {
                has_error('error_confirm', 'spanNewPasswordConfirm', 'New and confirmed passwords must match.');
            };
            var match = function (where) {
                if (where == "password") {
                    if (regex.test(accountInfo.newPassword)) {
                        is_ok('error_password', 'spanNewPassword');
                        jQuery('#default_message').hide();
                    } else {
                        has_error('error_password', 'spanNewPassword', 'Must be at least six characters with letters and numbers.');
                        jQuery('#default_message').hide();
                    }
                }
                if (where == "confirm") {
                    if (pwd != pwdConfirm) {
                        has_error('error_confirm', 'spanNewPasswordConfirm', 'New and confirmed passwords must match.');
                    } else {
                        is_ok('error_confirm', 'spanNewPasswordConfirm');
                        jQuery('#default_message').hide();
                    }
                }
            };
            var test_match = function () {
                has_error('error_password', 'spanNewPassword', 'Must be at least six characters with letters and numbers.');
            };
            var reset = function () {
                is_ok('error_password_old', 'spanOldPassword');
                is_ok('error_password', 'spanNewPassword');
                is_ok('error_confirm', 'spanNewPasswordConfirm');
            };
            if (el == "oldPassword") {
                default_data();
                if (oldPwd.length == 0) {
                    old_password();
                } else {
                    is_ok_no_icon('error_oldpassword', 'spanOldPassword');
                }
            } else if (el == "newPassword") {
                default_data();
                if (pwd.length == 0) {
                    password();
                } else {
                    if (pwd != pwdConfirm) {
                        match('password');
                    } else if (!regex.test(accountInfo.newPassword)) {
                        test_match();
                    } else {
                        is_ok('error_password', 'spanNewPassword');
                        is_ok('error_confirm', 'spanNewPasswordConfirm');
                        jQuery('#default_message').hide();
                    }
                }
            } else if (el == "newPasswordConfirm") {
                default_data();
                if (pwdConfirm.length == 0) {
                    password_confirm();
                } else {
                    if (pwd != pwdConfirm) {
                        match('confirm');
                    } else if (!regex.test(accountInfo.newPassword)) {
                        test_match();
                    } else {
                        is_ok('error_password', 'spanNewPassword');
                        is_ok('error_confirm', 'spanNewPasswordConfirm');
                    }
                }
            } else {
                $('#form_password').find('input').each(function () {
                    if ($(this).val().length == 0) {
                        default_data();
                        if ($(this).attr('id') == "oldPassword") {
                            old_password();
                        } else if ($(this).attr('id') == "newPassword") {
                            password();
                        } else if ($(this).attr('id') == "newPasswordConfirm") {
                            password_confirm();
                        }
                    } else {
                        if (pwd != pwdConfirm) {
                            default_data();
                            match();
                        } else if (!regex.test(accountInfo.newPassword)) {
                            default_data();
                            test_match();
                        } else {
                            if ($(this).attr('id') == "oldPassword") {
                            } else if ($(this).attr('id') == "newPassword") {
                                is_ok('error_password', 'spanNewPassword');
                            } else if ($(this).attr('id') == "newPasswordConfirm") {
                                is_ok('error_confirm', 'spanNewPasswordConfirm');
                            } else {
                                reset();
                            }
                        }
                    }
                });
            }
            break;
        case 'email':
            if (accountInfo.email.length == 0) {
                errorMsgs += "Enter a new email.";
                $("#error_email").html('Enter a new email.').removeClass('inline_success').addClass('inline_error');
                jQuery('#spanEmailTxt').addClass("errorItem");
                hasErrors = true;
            } else if (isValidEmail(accountInfo.email) == false) {
                errorMsgs += "Must be a valid email address.";
                $("#error_email").html('Must be a valid email address.').removeClass('inline_success').addClass('inline_error');
                jQuery('#spanEmailTxt').addClass("errorItem");
                hasErrors = true;
            } else {
                jQuery('#spanEmailTxt').removeClass("errorItem");
                $("#error_email").removeClass('inline_error').addClass('inline_success').html('');
            }
            break;
        default:
    }
    if (!hasErrors) errorMsgs = "";
    return errorMsgs;
};
var getFormInputs = function(){
	return {
		userName: jQuery.trim(jQuery('input#username').val()),
		oldPassword: jQuery.trim(jQuery('input#oldPassword').val()),
		newPassword: jQuery.trim(jQuery('input#newPassword').val()),
		newPasswordConfirm: jQuery.trim(jQuery('input#newPasswordConfirm').val()),
		email: jQuery.trim(jQuery('input#email').val())
	}
};