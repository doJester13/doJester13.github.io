var h = $( window ).height();
var w =  $( window ).width();
var amountScrolled = h;
var deadline = '2015-12-25';

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

$('#myModal').bind('hidden.bs.modal', function () {
  $("html").css("margin-right", "-17px");
});
$('#myModal').bind('show.bs.modal', function () {
  $("html").css("margin-right", "-17px");
});

//countdown
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "linear",
  "hideEasing": "swing",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "onclick" : true
}

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock(){
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if(t.total<=0){
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock,1000);
}


var totalTime = getTimeRemaining(deadline);
var roundDays = totalTime.days +1;
var relativeTime;
var timeText = "";

initializeClock('clockdiv', deadline);

toastr.options.onclick = function() {
	toastr.remove();
	$('#myModal').modal('show');
	$('#myModal').modal('handleUpdate');
};

$("#share").click(function(){
	relativeTime = getTimeRemaining(deadline); 
	timeText = "Only "+ relativeTime.days +" days, " + relativeTime.hours +" hours, " + relativeTime.minutes +" minutes and " + relativeTime.seconds +" seconds until Christmas!!!";  
	window.location.href = "https://twitter.com/share?text="+ timeText + "&url="+ encodeURIComponent(url) + "&via=dojester13";
});

toastr["info"](roundDays + " days until xmas!", "Christmas");


//"https://twitter.com/share?url="+encodeURIComponent(url)+"&via=dojester13"