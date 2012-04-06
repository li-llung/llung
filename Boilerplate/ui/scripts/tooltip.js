// JScript File
var currentCid=0;
var currentLvlId=0;
var ln=0;
var isIE = navigator.appName.indexOf("Microsoft") != -1;
function cws(cid,cln)
{
   if(currentCid==cid && ln==cln) Lynda.Web.P.M5([cid],getCDescCB,errCDescCB);
};
function cld(lvlid,cln)
{
   if(currentLvlId==lvlid && ln==cln) Lynda.Web.P.M10([lvlid],getCDescCB,errCDescCB);
};
function getCDescCB(res) {
    jQuery.noConflict();

    if (jQuery('#divHover') != null)
    {
        jQuery('#divHover').html(res);
    }
};
function errCDescCB(res)
{
};
function getY(element)
{
     var y = 0;
     for (var e=element;e;e=e=isIE ? e.parentElement : e.offsetParent)
     {
        y+=e.offsetTop;
     };
     for (e = element.parentNode;e&&e!=document.body;e=e.parentNode)
     {
        if (e.scrollTop) {y-=e.scrollTop;}
     };
     return y;
};
function getX(element)
{
  var x = 0;
  for (var e=element;e;e= isIE ? e.parentElement : e.offsetParent)
  {
    x+=e.offsetLeft; 
  }
  return x;
};   

function getWidth(element,widthForIE,widthForFireFox,widthForOthers,offset)
{
    var w = 0;
    
    switch(navigator.appName)
    {
    case "Microsoft Internet Explorer":
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
    {
     var ieversion=new Number(RegExp.$1);
     if(ieversion>=8)       {width = element.width+widthForIE;}
     else if (ieversion>=7) {width = element.width+widthForIE - offset;}
     else if (ieversion>=6) {width = element.width+widthForIE - offset-6;}
     else                   {width = element.width+widthForIE;}
    }
    break;
    case "Netscape":
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
    {
    width = element.width+getX(element)+widthForFireFox;
    }
    else
    {
    width = element.width+widthForOthers;    
    }
    break;
    default:
    width = element.width+getX(element);
    }
    return width;
};