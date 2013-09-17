/* settings block start */
document.write('<link rel="stylesheet" href="settings/style.css" type="text/css">');
document.write('<script type="text/javascript" src="settings/js/jquery.cookies.min.js"></script>');
document.write('<script type="text/javascript" src="settings/js/main.js"></script>');
/* settings block end */

function add_leading_zero(num) {
	var result = (num < 10) ? '0' + num.toString() : num;
	
	return result;
}

function count_num(num, content, target, duration) {
	if(duration) {
		var count = 0;
		var speed = parseInt(duration / num);
		var interval = setInterval(function(){
			if(count - 1 < num) {
				target.html(count);
			}
			else {
				target.html(content);
				clearInterval(interval);
			}
			count++;
		}, speed);
	}
	else {
		target.html(content);
	}
}

function init_menu() {
	function is_scrolled_header() {
		if(jQuery(window).scrollTop() > 0 && !jQuery('body').hasClass('static_menu')) jQuery('header').addClass('scrolled');
		else jQuery('header').removeClass('scrolled');
	}
	is_scrolled_header();
	
	var scroll_offset = (jQuery('body').hasClass('static_menu')) ? 0 : -52;
	
	jQuery('.main_menu li a').click(function(e){
		var content = jQuery(this).attr('href');
		var checkURL = content.match(/^#([^\/]+)$/i);
		if(checkURL) {
			jQuery.scrollTo(jQuery(content), 700, {
				offset : scroll_offset
			});
		}
		else {
			window.location = content;
		}
		
		e.preventDefault();
	});
	
	jQuery('.main_menu li').click(function () {
		jQuery('.main_menu li').removeClass('current_page_item');
		jQuery(this).addClass('current_page_item')
	});
	
	var lastId;
	var top_menu = jQuery('.main_menu');
	var top_menu_height = top_menu.outerHeight() + 500;
	var menu_items = top_menu.find('a');
	scroll_items = menu_items.map(function() {
		var content = jQuery(this).attr('href');
		var checkURL = content.match(/^#([^\/]+)$/i);
		if(checkURL) {
			var item = jQuery(jQuery(this).attr('href'));
			if(item.length) return item
		}
	});
	jQuery(window).scroll(function () {
		is_scrolled_header();
		var from_top = jQuery(this).scrollTop() + top_menu_height;
		var cur = scroll_items.map(function() {
			if(jQuery(this).offset().top < from_top) return this
		});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';
		if(lastId !== id) {
			lastId = id;
			menu_items.parent().removeClass('current_page_item').end().filter('[href=#' + id + ']').parent().addClass('current_page_item');
		}
	});
	
	
	if(window.location.hash) {
		var destination = window.location.hash;
		window.location.hash = '';
		jQuery(window).load(function() {
			setTimeout(function() {
				window.location.hash = destination;
			}, 300);
		});
	}
	
	build_responsive_menu();
}

function build_responsive_menu() {
	jQuery('#header').append('<div class="block_responsive_menu"><div class="inner"><div class="button"><a href="#">Menu</a></div></div><div class="r_menu"><div class="inner" /></div></div>');
	
	var menu_content = jQuery('.main_menu nav > ul').clone();
	jQuery('#header .r_menu .inner').append(menu_content);
	
	jQuery('.block_responsive_menu .r_menu ul').each(function() {
		jQuery(this).find('> li:last').addClass('last_menu_item');
	});
	jQuery('.block_responsive_menu .r_menu li').each(function() {
		if(jQuery(this).find('> ul').length > 0) jQuery(this).addClass('has_children');
	});
	
	jQuery('.block_responsive_menu .button a').click(function(e) {
		jQuery('.block_responsive_menu > .r_menu').slideToggle();
		
		e.preventDefault();
	});
	
	jQuery('.block_responsive_menu .r_menu .has_children > a').click(function(e) {
		if(!jQuery(this).parent().hasClass('expanded') || jQuery(this).attr('href') == '#') {
			jQuery(this).parent().toggleClass('expanded').find(' > ul').slideToggle();
			
			e.preventDefault();
		}
	});
	
	jQuery('.block_responsive_menu .r_menu li a').click(function(e){
		var content = jQuery(this).attr('href');
		var checkURL = content.match(/^#([^\/]+)$/i);
		if(checkURL) {
			jQuery.scrollTo(jQuery(content), 700);
		}
		else {
			window.location = content;
		}
		
		jQuery('.block_responsive_menu > .r_menu').slideUp();
		
		e.preventDefault();
	});
}

function init_block_animation() {
	var diff = 50;
	var w_height = jQuery(window).height();
	var sections = jQuery('#content section');
	
	jQuery(window).scroll(function() {
		sections.each(function() {
			var section = jQuery(this);
			if(!section.hasClass('done_animate') && (w_height + jQuery(window).scrollTop() - section.offset().top - diff > 0)) {
				section.addClass('done_animate').trigger('start_animation');
			}
		});
	});
	
	sections.bind('start_animation', function() {
		var section = jQuery(this);
		var id = section.attr('id');
		var animated_items = section.find('.scroll_animated_item');
		
		animated_items.each(function(num) {
			var block = jQuery(this);
			block.addClass('animate' + (num + 1)).addClass(block.attr('data-scroll-animation'));
		});
		
		switch(id) {
			case 'about' :
				window.setTimeout(function() {
					init_stats(1500);
					window.setTimeout(function() {
						init_skills(1000);
					}, 1000);
				}, 800);
			break;
		}
	});
	
	jQuery(window).resize(function() {
		w_height = jQuery(window).height();
	});
}

function init_fields() {
	jQuery('.w_def_text').each(function() {
		var text = jQuery(this).attr('title');
		
		if(jQuery(this).val() == '') {
			jQuery(this).val(text);
		}
	});
	
	jQuery('.w_def_text').bind('click', function() {
		var text = jQuery(this).attr('title');
		
		if(jQuery(this).val() == text) {
			jQuery(this).val('');
		}
		
		jQuery(this).focus();
	});
	
	jQuery('.w_def_text').bind('blur', function() {
		var text = jQuery(this).attr('title');
		
		if(jQuery(this).val() == '') {
			jQuery(this).val(text);
		}
	});
	
	jQuery('.custom_select:not(.initialized)').each(function() {
		jQuery(this).css('opacity', '0').addClass('initialized');
		jQuery(this).parent().append('<span />');
		var text = jQuery(this).find('option:selected').html();
		jQuery(this).parent().find('span').html(text);
		
		jQuery(this).bind('change', function() {
			var text = jQuery(this).find('option:selected').html();
			jQuery(this).parent().find('span').html(text);
		});
	});
	
	jQuery('.w_focus_mark').bind('focus', function() {
		jQuery(this).parent().addClass('focused');
	});
	
	jQuery('.w_focus_mark').bind('blur', function() {
		jQuery(this).parent().removeClass('focused');
	});
}

function init_pretty_photo() {
	if(!isMobile || isiPad) {
		jQuery('a[data-prettyphoto^="type-1"]').prettyPhoto({
			deeplinking : false,
			keyboard_shortcuts : false,
			slideshow : false,
			counter_separator_label : ' of ',
			gallery_markup : '',
			social_tools : '',
			show_title : false,
			horizontal_padding : 0,
			ie6_fallback : false,
			theme : 'pp_magnetto_1'
		});
		
		jQuery('a[data-prettyphoto^="type-2"]').prettyPhoto({
			deeplinking : false,
			keyboard_shortcuts : false,
			slideshow : 5000,
			counter_separator_label : ' of ',
			gallery_markup : '',
			social_tools : '',
			show_title : true,
			horizontal_padding : 0,
			ie6_fallback : false,
			theme : 'pp_magnetto_2'
		});
	}
}

function init_message_boxes() {
	jQuery('.general_info_box .close').live('click', function(e) {
		jQuery(this).parent().fadeOut(300);
		
		e.preventDefault();
	});
}

function init_filter() {
	var jQuerycontainer = jQuery('#filtered_container');
	
	jQuerycontainer.isotope({
		itemSelector : 'article'
	});
	
	jQuery('#filter a').bind('click', function(e) {
		var selector = jQuery(this).attr('href');
		if(selector == 'all') selector = '*'
		else selector = '.' + selector;
		
		jQuerycontainer.isotope({
			filter : selector,
			itemSelector : 'article'
		});
		
		jQuery('#filter li').removeClass('active');
		jQuery(this).parent().addClass('active');
		
		e.preventDefault();
	});
	
	jQuery('#filter_button').bind('click', function(e) {
		var container = jQuery(this).parents('.block_filter_1');
		container.toggleClass('opened');
		jQuery('.filter', container).slideToggle(200);
		
		e.preventDefault();
	});
	
	jQuery(window).resize(function() {
		jQuerycontainer.isotope('reLayout');
	});
}

function init_map() {
	var address_location;
	var markers = new Array();
	var current_location = 0;
	var count = 0;
	var lnks = jQuery('#map_locations a');
	var quantity = lnks.length;
	var block_address = jQuery('.block_contacts .addresses > div');
	var latlng = new google.maps.LatLng(0, 0);
	var my_options = {
		zoom : 7,
		center : latlng,
		scrollwheel : false,
		scaleControl : false,
		disableDefaultUI : false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), my_options);
	
	function render_markers() {
		var lnk = lnks.eq(count);
		var address = lnk.attr('data-address');
		var name = lnk.attr('data-name');
		var custom_map = new google.maps.Geocoder();
		custom_map.geocode({'address' : address}, function(results, status) {
			if(status == google.maps.GeocoderStatus.OK) {
				address_location = results[0].geometry.location;
				
				var marker = new google.maps.Marker({
					map : map,
					icon : 'layout/images/marker_map_1.png',
					position : address_location
				});
				
				var infowindow = new google.maps.InfoWindow({
					content: name
				});
				
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});
				
				markers.push(marker);
				count++;
				
				if(count < quantity) {
					render_markers();
				}
				else {
					center_map(current_location);
					init_lnks();
				}
			}
			else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}
	render_markers();
	
	function center_map(current) {
		map.setCenter(markers[current].getPosition());
		for(i = 0; i < quantity; i++) {
			markers[i].setIcon('layout/images/marker_map_1.png');
		}
		markers[current].setIcon('layout/images/marker_map_1_act.png');
		current_location = current;
	}
	
	function init_lnks() {
		lnks.bind('click', function(e) {
			var num = lnks.index(this);
			center_map(num);
			
			lnks.removeClass('current');
			jQuery(this).addClass('current');
			
			block_address.removeClass('current');
			block_address.eq(num).addClass('current');
			
			e.preventDefault();
		});
		
		jQuery('#view_map').bind('click', function(e) {
			var height = jQuery('.block_contacts').height();
			jQuery('.block_contacts').css('height', height + 'px');
			jQuery('#contacts').addClass('map_only');
			
			e.preventDefault();
		});
		
		jQuery('#view_contacts').bind('click', function(e) {
			jQuery('#contacts').removeClass('map_only');
			jQuery('.block_contacts').css('height', 'auto');
			
			e.preventDefault();
		});
	}
	
	jQuery(window).resize(function() {
		center_map(current_location);
	});
}

function init_button_up() {
	jQuery('#button_up').click(function(e) {
		jQuery.scrollTo(0, 700);
		
		e.preventDefault();
	});
}

function init_button_more() {
	jQuery('#view_more_button').bind('click', function(e) {
		var target = jQuery(this).attr('data-target');
		var container = jQuery(target);
		var old_content = jQuery('article', container);
		var new_content = old_content.clone().filter(':gt(2)').remove(); //instead of this do ajax request and get new elements, this line only for demo
		
		if(jQuery(target).hasClass('isotope')) {
			jQuery(target).isotope('remove', old_content);
			old_content.remove();
			jQuery(target).isotope('insert', new_content);
		}
		else {
			jQuery(target).append(content);
		}
		
		jQuery.scrollTo('#blog', 700);
		
		e.preventDefault();
	});
}

function init_services_1() {
	jQuery('#services_1').mCustomScrollbar({
		horizontalScroll : true,
		autoDraggerLength : false,
		mouseWheel : false,
		contentTouchScroll : false,
		advanced : {
			autoExpandHorizontalScroll : true
		}
	});
	
	jQuery(window).resize(function() {
		if(jQuery('#services').hasClass('done_animate')) jQuery('#services').addClass('no_animate');
	});
}

function init_portfolio_slider_1(target) {
	var flexslider;
	
	function calc_width() {
		var content_width = jQuery('#header > .inner').width();
		var width = 254;
		if(content_width < 1100) width = 220;
		if(content_width < 940) width = 364;
		if(content_width < 748) width = 420;
		if(content_width < 420) width = 300;
		return width;
	}
	
	function calc_margin() {
		var content_width = jQuery('#header > .inner').width();
		var width = 28;
		if(content_width < 1100) width = 20;
		return width;
	}
	
	jQuery(target).flexslider({
		animation : 'slide',
		controlNav : false,
		directionNav : true,
		animationLoop : false,
		slideshow : false,
		itemWidth : calc_width(),
		itemMargin : calc_margin(),
		useCSS : true,
		touch : false,
		start : function(slider) {
			flexslider = slider;
		}
	});
	
	jQuery(window).resize(function() {
		flexslider.flexAnimate(0);
		flexslider.vars.itemWidth = calc_width();
		flexslider.vars.itemMargin = calc_margin();
	});
}

function init_project_2(target) {
	var col_num = 5;
	if(jQuery(window).width() <= 1100) col_num = 4;
	if(jQuery(window).width() <= 767) col_num = 2;
	if(jQuery(window).width() <= 479) col_num = 1;
	var project_items = jQuery(target + ' article');
	var project_items_width = Math.floor(jQuery(window).width() / col_num);
	project_items.css('width', project_items_width + 'px');
}

function init_team_slider_1(target) {
	var flexslider;
	
	function calc_width() {
		var content_width = jQuery('#header > .inner').width();
		var width = 254;
		if(content_width < 1100) width = 220;
		if(content_width < 940) width = 364;
		if(content_width < 748) width = 420;
		if(content_width < 420) width = 300;
		return width;
	}
	
	function calc_margin() {
		var content_width = jQuery('#header > .inner').width();
		var width = 28;
		if(content_width < 1100) width = 20;
		return width;
	}
	
	jQuery(target).flexslider({
		animation : 'slide',
		controlNav : false,
		directionNav : true,
		animationLoop : false,
		slideshow : false,
		itemWidth : calc_width(),
		itemMargin : calc_margin(),
		useCSS : true,
		touch : false,
		move : 1,
		start : function(slider) {
			flexslider = slider;
		}
	});
	
	jQuery(window).resize(function() {
		flexslider.flexAnimate(0);
		flexslider.vars.itemWidth = calc_width();
		flexslider.vars.itemMargin = calc_margin();
	});
}

function init_stats(duration) {
	jQuery('.block_stats .num').each(function() {
		var container = jQuery(this);
		var num = container.attr('data-num');
		var content = container.attr('data-content');
		
		count_num(num, content, container, duration);
	});
}

function init_skills(duration) {
	jQuery('.block_skills .skill').each(function() {
		var container = jQuery(this).find('.note');
		var num = jQuery(this).find('.level_rail').attr('data-level');
		var content = num + '%';
		if(duration) {
			jQuery(this).find('.level').animate({width : num + '%'}, duration);
		}
		else {
			jQuery(this).find('.level').css({'width' : num + '%'});
		}
		
		count_num(num, content, container, duration);
	});
}

function init_blog_mobile() {
	var images = jQuery('.block_blog .posts img');
	var total = images.length;
	var count = 0;
	jQuery('body').append('<div id="tmp" style="display:none;" />');
	
	function load_imgs() {
		jQuery('#tmp').load(images.eq(count).attr('src'), function() {
			count++;
			if(count < total) {
				load_imgs();
			}
			else {
				jQuery('.block_blog .posts').isotope({
					itemSelector : 'article'
				});
				jQuery(window).resize(function() {
					jQuery('.block_blog .posts').isotope('reLayout');
				});
				jQuery('#tmp').remove();
			}
		});
	}
	load_imgs();
}

function init_blog() {
	jQuery('.block_blog .posts').isotope({
		itemSelector : 'article'
	});
	jQuery(window).resize(function() {
		jQuery('.block_blog .posts').isotope('reLayout');
	});
}

function init_project_slider() {
	var holder = jQuery('.block_parallax_caption_2 .slider');
	var handler = holder.children('.handler');
	var project_undone = holder.children('.project_undone');
	var project_done = holder.children('.project_done');
	holder.bind('mousedown touchstart', function(e) {
		jQuery(this).bind('mousemove touchmove', function(e) {
			var x = e.pageX - jQuery(this).offset().left;
			if(e.type == 'touchmove') {
				e.stopImmediatePropagation();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				x = touch.pageX - jQuery(this).offset().left;
			}
			if(x > parseInt(handler.width() / 3) && x < holder.width() - parseInt(handler.width() / 3)){
				handler.css('left', x);
				project_undone.css('width', x);
				project_done.css('width', holder.width() - x);
			}
		});
	});
	jQuery(window).bind('mouseup touchend', function() {
		holder.unbind('mousemove touchmove');
	});
	jQuery(window).resize(function() {
		var handler_left = parseInt(handler.css('left'));
		project_done.css('width', holder.width() - handler_left);
	});
}

function init_project_item() {
	var projects_all = jQuery('.projects_container article');
	var projects_quantity = projects_all.length;
	
	function show_project(source) {
		jQuery('.current_project').removeClass('current_project');
		
		var index = projects_all.index(source);
		var project = source.addClass('current_project').find('.project_item').clone();
		
		project.find('.slider > div').attr('id', 'project_item_slider').addClass('flexslider');
		project.find('.flexslider > ul').addClass('slides');
	
		jQuery('#project_item .inner').html(project);
		
		if(index <= 0) {
			jQuery('#project_item .projects_nav.prev').addClass('inactive');
		}
		else {
			jQuery('#project_item .projects_nav.prev').removeClass('inactive');
		}
		if(index >= (projects_quantity - 1)) {
			jQuery('#project_item .projects_nav.next').addClass('inactive');
		}
		else {
			jQuery('#project_item .projects_nav.next').removeClass('inactive');
		}
		
		jQuery('#project_item .project_zoom').attr('data-prettyphoto', 'type-1');
		jQuery('#project_item .slider .project_zoom').attr('data-prettyphoto', 'type-1[project-item]');
		init_pretty_photo();
		
		if(!jQuery('#project_item').hasClass('active')) {
			jQuery('#project_item').addClass('active').slideDown(500);
		}
		
		jQuery('#project_item_slider').flexslider({
			animation : 'fade',
			controlNav : false,
			directionNav : true,
			animationLoop : true,
			slideshow : false,
			useCSS : true,
			smoothHeight : true
		});
	}
	
	function hide_project() {
		jQuery('#project_item').removeClass('active').slideUp(300, function() {
			jQuery('.current_project').removeClass('current_project');
			jQuery('#project_item .project_item').remove();
		});
	}
	
	jQuery('a[data-rel^="projectItem"]').live('click', function(e) {
		var project = jQuery(this).parents('article').eq(0);
		jQuery.scrollTo('#projects', 500, {
			onAfter : function() {
				show_project(project);
			}
		});
		
		e.preventDefault();
	});
	
	jQuery('.projects_nav.prev').live('click', function(e) {
		if(!jQuery(this).hasClass('inactive')) {
			var current = projects_all.index(jQuery('.projects_container article.current_project'));
			var project = projects_all.eq(current - 1);
			show_project(project);
		}
		
		e.preventDefault();
	});
	
	jQuery('.projects_nav.next').live('click', function(e) {
		if(!jQuery(this).hasClass('inactive')) {
			var current = projects_all.index(jQuery('.projects_container article.current_project'));
			var project = projects_all.eq(current + 1);
			show_project(project);
		}
		
		e.preventDefault();
	});
	
	jQuery('.project_close').live('click', function(e) {
		hide_project();
		
		e.preventDefault();
	});
	
}

function init_main_slider(target) {
	set_height();
	
	jQuery(target).flexslider({
		animation : 'fade',
		controlNav : true,
		directionNav : true,
		animationLoop : true,
		slideshow : false,
		animationSpeed : 500,
		useCSS : true,
		start : function(slider) {
			if(!isMobile) {
				slider.slides.each(function(s) {
					jQuery(this).find('.animated_item').each(function(n) {
						jQuery(this).addClass('animate_item' + n);
					});
				});
				slider.slides.eq(slider.currentSlide).find('.animated_item').each(function(n) {
					var show_animation = jQuery(this).attr('data-animation');
					jQuery(this).addClass(show_animation);
				});
			}
			else {
				slider.find('.counter').find('.num').each(function() {
					var container = jQuery(this);
					var num = container.attr('data-num');
					var content = container.attr('data-content');
					
					count_num(num, content, container, false);
				});
			}
		},
		before : function(slider) {
			if(!isMobile) {
				slider.slides.eq(slider.currentSlide).find('.animated_item').each(function(n) {
					var show_animation = jQuery(this).attr('data-animation');
					jQuery(this).removeClass(show_animation);
				});
				slider.slides.find('.animated_item').hide();
				
				var counter_block = slider.slides.eq(slider.currentSlide).find('.counter');
				if(counter_block.length > 0) {
					setTimeout(function() {
						counter_block.find('.num').each(function() {
							jQuery(this).html('0');
						});
					}, 300);
				}
			}
		},
		after : function(slider) {
			if(!isMobile) {
				slider.slides.find('.animated_item').show();
				
				slider.slides.eq(slider.currentSlide).find('.animated_item').each(function(n) {
					var show_animation = jQuery(this).attr('data-animation');
					jQuery(this).addClass(show_animation);
				});
				
				var counter_block = slider.slides.eq(slider.currentSlide).find('.counter');
				if(counter_block.length > 0) {
					counter_block.find('.num').each(function() {
						var container = jQuery(this);
						var num = container.attr('data-num');
						var content = container.attr('data-content');
						
						count_num(num, content, container, 1500);
					});
				}
			}
		}
	});
	
	function set_height() {
		var w_height = jQuery(window).height();
		jQuery(target).height(w_height).find('.slides > li').height(w_height);
	}
	
	jQuery(window).resize(function() {
		set_height();
	});
}

function init_scroll_lnks() {
	jQuery('.lnk_scroll').bind('click', function(e) {
		var destination = jQuery(this).attr('href');
		jQuery.scrollTo(destination, 500);
		
		e.preventDefault();
	});
}

function init_touch_hover() {
	jQuery('.hover').bind('click', function() {
		jQuery(this).parent().toggleClass('hovered');
	});
}

jQuery(document).ready(function() {
	init_menu();
	init_fields();
	init_button_more();
	init_button_up();
	init_message_boxes();
	init_scroll_lnks();
	init_project_slider();
	init_services_1();
	init_pretty_photo();
	init_project_item();
	init_map();
	
	if(isMobile) {
		jQuery('body').addClass('touch_device');
		init_stats(false);
		init_skills(false);
		init_touch_hover();
		init_filter();
		init_blog_mobile();
		jQuery('.general_not_loaded').removeClass('general_not_loaded');
	}
	else {
		jQuery('body').addClass('desktop_device');
		init_block_animation();
	}

	jQuery('audio').mediaelementplayer({
		audioWidth: '100%',
		audioHeight: 30,
		features: ['playpause', 'current', 'progress', 'duration', 'volume']
	});
	
	jQuery('.w_tooltip').tooltip({
		position : 'bottom center',
		offset : [5, 0],
		effect : 'fade',
		tipClass : 'tooltip_1'
	});
});

jQuery(window).load(function() {
	if(!isMobile) {
		init_filter();
		init_blog();
		jQuery('.general_not_loaded').removeClass('general_not_loaded');
	}
});


