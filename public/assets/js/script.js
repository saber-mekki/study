(function ($) {
    'use strict';

    /*------------------
           few modifications for react
        ------------------*/

    $( document ).ready(function() {
        initiators();
        sliders();
    });

    $('body').delegate('.nice-select', 'click', function() {
        $(this).addClass('open')
    })

    $('body').delegate('.initiate-scripts', 'click', function() {
        setTimeout(() => {
            initiators();
            sliders();
        }, 100)
    });

    // preloader
    // $(window).on('load', function () {
    //     setTimeout (function(){
    //         $('.preloader').fadeOut(200);
    //     },50);
    // });

    function initiators() {
        // custom select
        $('select:not(.custom-select)').niceSelect();

        // js counterUp
        $('.jsCounter').counterUp({
            delay: 10,
            time: 1000
        });


        // video popup init
        $('.has-video-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    function sliders() {
        // tutorCarousel Init
        $('.tutor-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            dotsEach: true,
            responsive : {
                0 : {
                    items: 1
                },
                991 : {
                    items: 2
                }
            }
        });

        // tutorsCarousel-alt Init
        $('.tutors-carousel-alt').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            dotsEach: true,
            responsive : {
                0 : {
                    items: 1
                },
                767 : {
                    items: 2
                },
                1200 : {
                    items: 3
                }
            }
        });


        // courseCarousel Init
        var courseOwl = $('.course-carousel');
        courseOwl.owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            responsive : {
                0 : {
                    items: 1
                },
                767 : {
                    items: 2
                },
                991 : {
                    items: 3
                },
                1200 : {
                    items: 4
                }
            }
        });

        // galleryCarousel Init
        var galleryOwl = $('.image-gallery');
        galleryOwl.owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true,
            items: 1
        });

        // student-says-carousel Init
        var studentSays = $('.student-says-carousel');
        studentSays.owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            items: 1
        });

        // Custom Navigation Events
        $('body').delegate('.course-left', 'click', function(e) {
            courseOwl.trigger('prev.owl.carousel');
        });
        $('body').delegate('.course-right', 'click', function(e) {
            courseOwl.trigger('next.owl.carousel');
        });


        // Custom Navigation Events
        $('body').delegate('.gallery-left', 'click', function(e) {
            galleryOwl.trigger('prev.owl.carousel');
        });
        $('body').delegate('.gallery-right', 'click', function(e) {
            galleryOwl.trigger('next.owl.carousel');
        });

        // Custom Navigation Events
        $('body').delegate('.student-says-left', 'click', function(e) {
            studentSays.trigger('prev.owl.carousel');
        });
        $('body').delegate('.student-says-right', 'click', function(e) {
            studentSays.trigger('next.owl.carousel');
        });

        // instructors-carousel Init
        var instructorsCarousel = $('.instructors-carousel');
        instructorsCarousel.owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            responsive : {
                0 : {
                    items: 1
                },
                575 : {
                    items: 2
                },
                991 : {
                    items: 3
                }
            }
        });
        // Custom Navigation Events
        $('body').delegate('.instructors-left', 'click', function(e) {
            instructorsCarousel.trigger('prev.owl.carousel');
        });
        $('body').delegate('.instructors-right', 'click', function(e) {
            instructorsCarousel.trigger('next.owl.carousel');
        });
    }

    // scroll to top init
    $(window).on('scroll', function () {
        var scrollToTop = $('.scroll-to-top'),
            scroll = $(window).scrollTop();
        if (scroll >= 500) {scrollToTop.addClass('show');}
        else {scrollToTop.removeClass('show');}
    });

    $('body').delegate('.scroll-to-top', 'click', function(e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, '500');
        return false;
    });

    // dropdown-animation
    if ($(window).width() < 1199) {
        $('body').delegate('.header .dropdown-toggle', 'click', function(e) {
            $(this).siblings('.dropdown-menu, .dropdown-submenu').animate({
                height: 'toggle'
            }, 300);
        });
    }

    // custom select
    $('body').delegate('.navbar-toggler', 'click', function(e) {
        $(this).children('span').toggleClass('fa-times fa-bars');
    });

})(jQuery);