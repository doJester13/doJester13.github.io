var h = $( window ).height();
var w =  $( window ).width();
var amountScrolled = h;

$(window).scroll(function() {
	if ( $(window).scrollTop() > amountScrolled ) {
		$("a.scrollToTop").fadeIn('slow');
		$("a.scrollToTop").toggleClass( "animated tada" );
	} else {
		$("a.scrollToTop").fadeOut('fast');
		$("a.scrollToTop").toggleClass( "animated tada" );
	}
});

$("a.scrollToTop").click(function() {
	$("html, body").animate({
		scrollTop: 0
	}, 700);
	return false;
});
