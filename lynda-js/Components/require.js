lynda.require = {
    /* Methods:
     lynda.require.js(file):Require javascript file. 
     lynda.require.css(file):Require css file.
     */
js:function(file){
    /* Purpose:
     Require a javascript file. This method will check to see if the script is already exists on the page, and append the script to the <head> if it does not exist on the page. 
     */
    //Method logic goes here…
    var fileFound = false;
    $("script").each(function(){
                     if($(this).attr('src') == file){ fileFound = true; return true; }
                     });
    if(!fileFound){
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = file;
        //JQuery will actually execute the javasctipt on the document
        $('head').append(script);
        //The script is attached to the head element so that it is tracked.
        document.head.appendChild(script);
    }
    return true;
},
css:function(file){
    /* Purpose:
     Require a css file. This method will check to see if the linked stylesheet is already exists on the page, and append the linked stylesheet to the <head> if it does not exist on the page. 
     */
    //Method logic goes here…
    var fileFound = false;
    $("link").each(function(){
                   if(($(this).attr('rel') == "stylesheet") && ($(this).attr('href') == file)){ fileFound = true; return true; }
                   });
    if(!fileFound){
        var link = document.createElement('link');
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = file;
        document.head.appendChild(link);
    }
    return true;
}
};