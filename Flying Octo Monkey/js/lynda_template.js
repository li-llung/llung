(function($){
    lynda.overlay=function(command, options, callback)
    {
        var public = this;
        public.is_open = false;
        public.is_loaded = false;
        var $scope = {element:this, command: command, options:options, callback:callback};
        $scope.defaults = {
        };
        $scope.init = function(element, settings){

        };
        lynda.modularize($scope);
        $scope.callback();
        return $scope.returnValue;
    };
})(jQuery);
