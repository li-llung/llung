// Elements is ready to go
Elements.ready(function() {
	console.log('Elements is ready to go...', Elements.debug());

	// placeholder polyfil
	if(Elements.isOldie || Elements.$dom.find('html').hasClass('ie9')) {
		$('input, textarea').placeholder();
	}
});

// Oldie document loaded
Elements.oldie(function() {
	console.log("This is an oldie browser...");
});

// Touch devices loaded
Elements.touch(function() {
	console.log("This is a touch enabled device...");
});

// Document ready
$(function() {

});

