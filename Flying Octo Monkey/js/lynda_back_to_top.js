(function($){
    lynda.backToTop=function(command, options, callback)
    {
        var $scope = {element:this, command: command, options:options, callback:callback};
        $scope.defaults = {
            selector: '.back_to_top',
            css_class: 'back_to_top',
            speed: 'fast',
            threshold: 100,
            faded: 0.5,
            delay: 800,
            text: 'back to top',
            start: true,
            fixed: true,
            snapTo: false,
            snapElement: '',
            snap_adjust: 0
        };
        $scope.init = function(element, settings){
            var o = settings;
            if (jQuery(o.selector).length) {
                jQuery(o.selector).remove();
            }
            if(o.start){
                $('<div/>', {
                    'class': o.css_class,
                    html: '<a>'+o.text+'</a>'
                }).fadeTo('fast', o.faded).hide().appendTo('body');
                if(o.snapTo !== false){
                    var position = ((($('body').width() - $(o.snapElement).outerWidth()) / 2) + o.snap_adjust);
                    $('.' + o.css_class).css('right', position);
                }
                $('<a/>', {
                    id: 'top'
                }).prependTo('body');
                $(window).bind('scroll resize', function () {
                    if($(window).scrollTop() > o.threshold){
                        if(o.fixed){
                            $(o.selector).fadeIn();
                        }else{
                            var btt_top = (($(window).scrollTop() + $(window).height()) - $(o.selector).height());
                            $(o.selector).css('top', btt_top).fadeIn();
                        }
                    }else{
                        $(o.selector).fadeOut();
                    }
                });
                var bttFade = function(my_fade){
                    if($(window).scrollTop() > o.threshold){
                        $(o.selector).fadeTo(o.speed, my_fade);
                    }else{
                        $(o.selector).fadeOut();
                    }
                };
                $(o.selector).live('click', function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, o.delay);
                    return false;
                }).hover(
                    function () {
                        bttFade(1);
                    },
                    function () {
                        bttFade(o.faded);
                    }
                );
            }
        };
        lynda.modularize($scope);
        $scope.callback();
        return $scope.returnValue;
    };
    $(document).ready(function () {
        $('body').lynda().backToTop({start: true});
    });
})(jQuery);