
lynda.slider = function(element, options){
    /* options {
     
     }
     */        
    //Required Files go here…
    //Component logic goes here…
    var slideContainer = document.createElement('div');
    $(slideContainer).css("position", "relative");
    $(slideContainer).css("right", 0);
    $(slideContainer).width($(element).children().size()*$(element).width());
    $(slideContainer).height($(element).height());
    $(element).children().width($(element).width());
    $(element).children().css("float","left");
    $(slideContainer).append($(element).children());
    $(element).append(slideContainer);
    
    var controlBar = document.createElement('div');
    $(controlBar).addClass("lynda-slider-controlbar");
    $(controlBar).height(34);
    $(element).height($(element).height()+34);
    $(element).append(controlBar);
    
    var slidePosition = 1;
    $(slideContainer).children().each(function(){
                                      var slideButton = document.createElement('button');
                                      var slide = $(this);
                                      $(slideButton).click(function(){goToSlide(slide);});
                                      $(slideButton).addClass("lynda-slider-controlbar-button");
                                      $(controlBar).append(slideButton);
                                      $(this).data("position", slidePosition);
                                      $(slideButton).data("slide", $(this));
                                      slidePosition++;
                               });
    //Animate
    var animationTimer = null;
    function startAnimation(slide){
        if($(slide).data("position") < $(slideContainer).children().size()){
            animationTimer = setTimeout(function(){
                                        goToSlide(slide.next());
                                        }, 3000);
        }
        else{
            animationTimer = setTimeout(function(){ 
                                        goToSlide($(slideContainer).children().first());
                                        }, 2000);
        }
    }
    function stopAnimation(){
        clearTimeout(animationTimer);
    }
    startAnimation($(slideContainer).children().first());
    //Go to a specific slide
    function goToSlide(slide){
        clearTimeout(animationTimer);
        $(controlBar).children().removeClass("active");
        $(controlBar).children(":nth-child("+$(slide).data("position")+")").addClass("active");
        $(slideContainer).animate({"right":$(element).width()*($(slide).data("position")-1)});
        $(".lynda-slider-control-button").removeClass("active");
        startAnimation($(slide));
    }
}