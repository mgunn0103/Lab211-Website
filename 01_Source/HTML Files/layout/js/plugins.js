/* mobile */
var isMobile = false;
var isiPad = false;
function isMobile_f() {
    var array_mobileIds = new Array('iphone', 'android', 'ipad', 'ipod');
    var uAgent = navigator.userAgent.toLowerCase();
    for (var i=0; i<array_mobileIds.length; i++) {
		if(uAgent.search(array_mobileIds[i]) > -1) {
			isMobile = true;
			if(array_mobileIds[i] == 'ipad') isiPad = true;
		}
    }
}
isMobile_f();

//Entypo
document.write('<link rel="stylesheet" href="layout/plugins/entypo/fonts.css" type="text/css">');

//Custom Scrollbar
document.write('<link rel="stylesheet" href="layout/plugins/customscrollbar/jquery.mCustomScrollbar.css" type="text/css">');
document.write('<script type="text/javascript" src="layout/plugins/customscrollbar/jquery.mCustomScrollbar.min.js"></script>');

//Animation
if(!isMobile) document.write('<link rel="stylesheet" href="layout/plugins/cssanimation/animate.css" type="text/css">');
if(!isMobile) document.write('<link rel="stylesheet" href="layout/plugins/cssanimation/delays.css" type="text/css">');

//FlexSlider
document.write('<link rel="stylesheet" href="layout/plugins/flexslider/flexslider.css" type="text/css">');
if(!isMobile) document.write('<link rel="stylesheet" href="layout/plugins/flexslider/animation_delays.css" type="text/css"/>');
document.write('<script type="text/javascript" src="layout/plugins/flexslider/jquery.flexslider-min.js"></script>');

//Media Element
document.write('<link rel="stylesheet" href="layout/plugins/mediaelement/mediaelementplayer.css" type="text/css"/>');
document.write('<script type="text/javascript" src="layout/plugins/mediaelement/mediaelement-and-player.min.js"></script>');
document.write('<script type="text/javascript" src="layout/plugins/mediaelement/custom.js"></script>');

//Sort
document.write('<script type="text/javascript" src="layout/plugins/sort/jquery.sort.min.js"></script>');

//ScrollTo
document.write('<script type="text/javascript" src="layout/plugins/scrollto/jquery.scroll.to.min.js"></script>');

//PrettyPhoto
document.write('<link rel="stylesheet" href="layout/plugins/prettyphoto/css/prettyPhoto.css" type="text/css">');
document.write('<script type="text/javascript" src="layout/plugins/prettyphoto/jquery.prettyPhoto.js"></script>');

//jQuery tools
document.write('<script type="text/javascript" src="layout/plugins/tools/jquery.tools.min.js"></script>');

//Google Maps API
document.write('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>');
