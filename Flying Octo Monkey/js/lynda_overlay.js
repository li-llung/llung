(function($){
    lynda.overlay=function(command, options, callback)
    {
        var public = this;
        public.is_open = false;
        public.is_loaded = false;
        var $scope = {element:this, command: command, options:options, callback:callback};
        $scope.defaults = {
            href: '',
            css_class: 'overlay',
            title: '',
            type: 'regular',
            element: 'overlay',
            data_class: 'my_overlay',
            call: '',
            width: 'user',
            height: 'user',
            rounded: '7px',
            start: true,
            show: false,
            close: false
        };
        $scope.init = function(element, settings){

        };
        $scope.show_overlay = function(element, settings){

        };
        $scope.close_overlay = function(element, settings){

        };
        lynda.modularize($scope);
        $scope.callback();
        return $scope.returnValue;
    };
})(jQuery);