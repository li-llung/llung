/************************************************************
Start Framework Script		
************************************************************/
jQuery(document).ready(function()
{               
	if(typeof (window['ldc'])=='undefined'){
	    ldc=new framework();
     }     
});
function framework()
{                    
	/*Start Global Variables*/
     var server_vars;
     var widgets;	
	/*End Global Variables*/    
          
     /*Start Init functions*/                     
     this.init = function(new_defaults){
          server_vars = new_defaults.vars;
          widgets = new_defaults.widgets;
     }
     /*End Init functions*/
		
	/*Start Global Functions*/
		/*Start Public*/
		/*End Public*/
     /*End Global Functions*/
}
/************************************************************
End Framework Script
************************************************************/