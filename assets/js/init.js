document.addEventListener('DOMContentLoaded', function () {


    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };


    $('input[type="tel"]').mask("+7(999) 999-9999");

    $('.primer-slider').slick({
        infinite: false,

        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.smart-block__slider').slick({
        infinite: false,
        slidesToShow: 1,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    })

    $('.review-slider-top').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.review-slider-nav'
    });

    $('.review-slider-nav').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        focusOnSelect: true,
        asNavFor: '.review-slider-top',
    });


});