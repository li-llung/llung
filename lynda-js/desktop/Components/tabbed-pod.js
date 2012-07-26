lynda.tabbed_pod=function(container){
    //create navigation
    var tabs = $(container).children();
    var navigation = document.createElement('ul');
    $(tabs).each(function(){
      var tab = $(this);
      var navigationItem = document.createElement('li');
      $(navigationItem).text($(tab).data('title'));
      $(navigationItem).click(function(){
        $(tabs).hide();
        $(navigation).children().removeClass('active');
        $(tab).show();
        $(this).addClass('active');
      });
      $(navigation).append(navigationItem);
    });
    $(container).prepend(navigation);

    //create title
    var title = $(container).data('title') ? $(container).data('title') : 'no title';
    var titleElement = document.createElement('h1');
    $(titleElement).text(title);
    $(container).prepend(titleElement);

    //Select first tab
    $(navigation).children(':first-child').click();
    
}