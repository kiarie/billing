;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			supported_browsers:function(){
			if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
				return true;
			}
			return false;
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			Array.from(document.querySelectorAll('.js-fullheight')).map(function(elem){
				elem.style.height = ""+window.innerHeight+"px";
			});
			window.onresize = function(evt){
				Array.from(document.querySelectorAll('.js-fullheight')).map(function(elem){
				elem.style.height = ""+window.innerHeight+"px";
			});
			};
		} 
		// if(!isMobile.any()) {
		// 	$('.js-fullheight').css('height', $(window).height());
		// 	$(window).resize(function(){
		// 		$('.js-fullheight').css('height', $(window).height());
		// 	});
		// }
		if(!isMobile.supported_browsers()) {
			alert('Please Use a Supported Browser Chrome/Firefox/Safari')
		}

	};

	var sliderMain = function() {
		
	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};

	var centerBlock = function() {
		$('.fh5co-section-with-image .fh5co-box').css('margin-top', -($('.fh5co-section-with-image .fh5co-box').outerHeight()/2));
	  	$(window).resize(function(){
	  		$('.fh5co-section-with-image .fh5co-box').css('margin-top', -($('.fh5co-section-with-image .fh5co-box').outerHeight()/2));
	  	});
	};

	var responseHeight = function() {
		setTimeout(function(){
			$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
		}, 1);
		
		$(window).resize(function(){
			setTimeout(function(){
				$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
			}, 1);
		})
	};

//hide/open mobile nav
	var mobileMenuOutsideClick = function() {
      
        document.addEventListener('click', function(evt){
			var container = document.querySelector('.js-fh5co-nav-toggle');
			if(evt.target !== container && evt.target !== container.querySelector('i')){
				restructure()
				}//endif
		});	
		// $(document).click(function (e) {
	    // var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    // if (!container.is(e.target) && container.has(e.target).length === 0) {

	    // 	if ( $('body').hasClass('offcanvas-visible') ) {

    	// 		$('body').removeClass('offcanvas-visible');
    	// 		$('.js-fh5co-nav-toggle').removeClass('active');
				
	    // 	}
	    // }
		// });

	};
    var _$ = function(elem){
        return document.createElement(elem);
    }
//this clones the links for use in mobile view
	var offcanvasMenu = function() {
        var elem = _$('div');//create Div element
        elem.id = "fh5co-offcanvas"; //Add an id attribute to it
        document.body.insertBefore(elem, null); //insert in the document body before all else
		var a = _$('a'); //create an anchor tag
        a.classList.add("js-fh5co-nav-toggle"); //add a class to it
        a.classList.add("fh5co-nav-toggle");
        a.appendChild(_$('i'));		//add that created i tag element this is the open and close icon the three bars

        document.body.insertBefore(a, null);//insert it to DOM	
		var home = _$('div')
		home.classList.add("side-nav-header");
		home.appendChild(document.querySelector('.header-inner a').cloneNode(true));
		document.querySelector('#fh5co-offcanvas').appendChild(home)
        document.querySelector('#fh5co-offcanvas').
        appendChild(document.querySelector('#fh5co-header nav').cloneNode(true));
		
	};

    
	var burgerMenu = function() {
        var burger = document.querySelector('.js-fh5co-nav-toggle');
        var DOMbody = document.body.classList;

        burger.addEventListener('click', function(evt){
            if(burger.classList.contains('active'))
            {
                restructure();
            }else{
                DOMbody.add('fh5co-overflow');
                DOMbody.add('offcanvas-visible');
                this.classList.add('active');                
            }
        });
		
	    window.onresize = restructure;
		window.onscroll = restructure;

	};
    var restructure = function () {
            var burger = document.querySelector('.js-fh5co-nav-toggle');
             var DOMbody = document.body.classList;
			if ( DOMbody.contains('offcanvas-visible')) {
                DOMbody.remove('offcanvas-visible');
                burger.classList.remove('active');
                }
           };


	var toggleBtnColor = function() {
		if ( $('#fh5co-hero').length > 0 ) {	
			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.fh5co-nav-toggle').addClass('dark');
				}
			} , { offset: - $('#fh5co-hero').height() } );

			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.fh5co-nav-toggle').removeClass('dark');
				}
			} , { 
				offset:  function() { return -$(this.element).height() + 0; }
			} );
		}
	};
	var getFullYear = function()
	{
		var date = new Date(),
			fullyear = date.getFullYear(),
			copyright_div = document.body.querySelector('.fh5co-copyright > p'),
			$copy = document.createTextNode(fullyear);
		copyright_div.appendChild($copy)
	}


	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
  

 	$(function(){
		fullHeight();
		sliderMain();
		centerBlock();
		responseHeight()
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		toggleBtnColor();
		contentWayPoint();
		getFullYear();
	});


}());