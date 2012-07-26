lynda.video = function(container){
    /* required{
        data-videoSource: The source of the video that should be played
    */
    videoSource = $(container).data('videoSource') ? $(container).data('videoSource') : $(container).text()
    /* options {
     data-trigger:The id of an element used to trigger the openening of a Modal View.
     data-width:The width of the content area in the Modal View. (The content margin will be added later)
     data-height:The height of the content area in the Modal View. (The content margin will be added later)
     data-margin:The margin between the content area and the edge of the Modal View. 
     }
     */
    //Required Files go here…
    jwplayerJavascriptUrl = "http://localhost/~broseborough/svn/lynda-js/desktop/JWPlayer/";
    lynda.require.js(jwplayerJavascriptUrl + "jwplayer.js");
    //Component logic goes here…
    if($(container).attr('id') == null){ $(container).attr('id', "lynda-video-" + Math.floor(Math.random()*9999)); }
    jwplayer($(container).attr('id')).setup({
                                            'flashplayer':jwplayerJavascriptUrl + "/player5.4.swf",
                                            'width':$(container).width(),
                                            'height':$(container).height(),
                                            'file':videoSource,
                                            'image':videoSource.replace(/\.[^\.]+$/, ".png"),
                                            'skin':jwplayerJavascriptUrl + "desktop.zip",
                                            'controlbar.idlehide':$(container).data('hidecontrolbar') ? true : false
                                            });
    jwplayer().onReady(function(){ 
                       });
    jwplayer().onComplete(function(){
                          jwplayer($(container).attr('id')).setup({
                                                                  'flashplayer':jwplayerJavascriptUrl + "player5.4.swf",
                                                                  'width':$(container).width(),
                                                                  'height':$(container).height(),
                                                                  'file':videoSource,
                                                                  'image':videoSource.replace(/\.[^\.]+$/, ".png"),
                                                                  'skin':jwplayerJavascriptUrl + "desktop-replay.zip",
                                                                  'controlbar.idlehide':$(container).data('hidecontrolbar') ? true : false
                                                                  });
                          });
}