(function($){
    //COMPONENT DECLARATION
    //Rename 'component' to the name of your component–leave the arguments as they are
    //Example:
    //      lynda.overlay=function…
    lynda.component=function(command, options, callback)
    {
        //SCOPE INITIALIZATION
        //There should really be no reason to touch this but you may add properties to the scope like defaults below
        var $scope = {element:this, command: command, options:options, callback:callback};
        
        //DEFAULTS INITIALIZED ON THE SCOPE
        //
        //Defaults is an optional block that allows you to set default values for the component.
        //Example: 
        //      $scope.defaults = {
        //          width: 100,
        //          height: 200,
        //          color: 'red'
        //      }
        //
        //You can then use the defaults by selecting them in the $scope.settings object
        //Example:
        //      var myWidth = settings.width;
        $scope.defaults = {};
        
        //COMPONENT INITIALIZATION
        //This is the default method that gets called when no command argument is given.
        //Every component must have an init method.
        $scope.init = function(element, settings){

        };
        //ADDITIONAL METHODS OR COMMANDS
        //Additional methods or commands may be created the same way that init is created.
        //Example:
        //      $scope.show = function(element, settings){…};
        
        //Modularize is a method that will initialize the component properly
        lynda.modularize($scope);
        $scope.callback();
        return $scope.returnValue;
    };
})(jQuery);