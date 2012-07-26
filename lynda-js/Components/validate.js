lynda.validate = function(container){
    /* options {
     data-notify: An array of jQuery selectors that will be given processing/error/success classes along with the field and inline messaging
     data-type: The name of the type of validation that will take place. 
     }
     */
    //Required Files go here…
    //Component logic goes here…
    var validateTimer = null;
    $(container).keyup(function(){
        var validation_type = $(this).data("type");
        clearTimeout(validateTimer);
        if($(container).attr("value")){
            validateTimer = setTimeout(function(){ validateField(container, validation_type); }, 1000);
        }
    });
    $(container).blur(function(){
        validateField(container, $(container).data("type"));
    });
    function validateField(field, validation_type){
       var isValid = true;
        var message = null;
        var ajax = false;
        notifySelectors = $(field).data("notify") ? $(field).data("notify") : null;
        if(typeof notifySelectors == "string"){ notifySelectors = $.parseJSON($(field).data("notify").replace(/'/g, '"')); }
                                                                                                              $(field).nextAll('.lynda-validate-message').eq(0).addClass("processing");
        for(var i in notifySelectors){
            $(notifySelectors[i]).addClass("processing");
        }
        switch(true){
            case /^name$/.test(validation_type):
                   isValid = /^[a-zA-Z\-\.\']{1,50}$/.test($(field).attr("value")) ? true : false;
                   message = isValid ? " " : "Only letters, dots, dashes, and apostrophes.";
               break;
                case /^creditCard$/.test(validation_type):
                    $(field).attr("value", $(field).attr("value").replace(/[^0-9]/g, ''));
                    isValid = /^[0-9]{12,19}$/.test($(field).attr("value")) ? true : false;
                         if(isValid){
                     isValid = luhnCheck($(field).attr("value")) ? true : false;
                         }
                         message = isValid ? " " : "Enter a valid card number."
                break;
                case /^emailAddress$/.test(validation_type):
                    isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test($(field).attr("value")) ? true : false;
                    message = isValid ? " " : "Enter a valid email address."
                break;
                case /^password$/.test(validation_type):
                    isValid = validatePassword($(field).attr("value")) ? true : false;
                    message = isValid ? " " : "At least 6 characters with both numbers and letters.";
                break;
                case /^phoneNumber$/.test(validation_type):
                    $(field).attr("value", $(field).attr("value").replace(/[a-z]/gi, ""));
                    isValid = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test($(field).attr("value")) ? true : false;
                    message = "Enter a valid phone number."
                break;
                case /^securityCode$/.test(validation_type):
                    isValid = /^[0-9]{3,4}$/.test($(field).attr("value")) ? true : false;
                    message = isValid ? " " : "Enter a 3- or 4-digit code."
                break;
                case /^username$/.test(validation_type):
                    isValid = /^[^ ]{1,50}$/.test($(field).attr("value")) ? true : false;
                    if(isValid){
                        //Check if username exists in database
                        ajax = true;
                        $.ajax({
                            url:"http://lynda.com/",
                            success:function(){ 
                                //If username exists
                                //updateValidationDisplay(field, false, "Not available; try your email address.");
                                //If user does not exist
                                //updateValidationDisplay(field, true, " ");
                            }
                        });
                    }
                break;
                case /^verifyPassword$/.test(validation_type):
                    isValid = validatePassword($(field).attr("value")) ? true : false;
                    message = isValid ? " " : "At least 6 characters with both numbers and letters.";
                    if(isValid){
                        isValid = $(field).attr("value") == $("#"+$(field).data("affiliate")).attr("value") ? true : false;
                        message = isValid ? " " : "Password must match";
                    }
                break;
                default: window.console.log("You tried to validate a field that we do not have validation criteria for");
            }
            if(!ajax){
                updateValidationDisplay(field, isValid, message)
            } 
    }
    function updateValidationDisplay(field, isValid, message){
            if(isValid){ 
                $(field).nextAll('.lynda-validate-message').eq(0).addClass("success").removeClass("error").removeClass("processing").text(message);
                for(var i in notifySelectors){
                    $(notifySelectors[i]).addClass("success").removeClass("error").removeClass("processing");
                }
             }
            else{ 
                $(field).nextAll('.lynda-validate-message').eq(0).addClass("error").removeClass("success").removeClass("processing").text(message);
                for(var i in notifySelectors){
                    $(notifySelectors[i]).addClass("error").removeClass("success").removeClass("processing");
                }
             }
    }
    function validatePassword(password){
            if(!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password) || !/.{6,}/.test(password)){
                return false;
            }
            return true;
    }
    function luhnCheck(a,b,c,d,e) {
            for(d = +a[b = a.length-1], e=0; b--;)
                c = +a[b], d += ++e % 2 ? 2 * c % 10 + (c > 4) : c;
            return !(d%10);
    } 
}