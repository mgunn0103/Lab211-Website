var parameters =  new Array();
var settings_block = '<div class="block_settings_wrapper"><div id="block_settings" class="block_settings">\
		<section>\
			<a href="index_alt_portfolio.html#projects" class="standart">Alternative Portfolio</a>\
			<a href="index.html#projects" class="alternative">Standart Portfolio</a>\
		</section>\
		\
        <a href="#" id="settings_close">Close</a>\
    </div></div>';
	
function init_close() {
	parameters.push('opened');
	jQuery('#settings_close').click(function(e) {
		jQuery('body').toggleClass('opened_settings');
		if(!jQuery.cookies.get('opened')) jQuery.cookies.set('opened', 'opened_settings');
		else jQuery.cookies.del('opened');
		
		e.preventDefault();
	});
}

function init_cookies() {
	for(key in parameters) {
		var name = parameters[key];
		var parameter = jQuery.cookies.get(name);
		if(parameter) {
			jQuery('body').addClass(parameter);
		}
	}
}

jQuery(document).ready(function() {
	jQuery('body').prepend(settings_block);
	
	init_close();
	init_cookies();
	
	if(jQuery('#projects_2').length > 0) {
		jQuery('body').addClass('page_alternative');
	}
	else {
		jQuery('body').addClass('page_standart');
	}
});