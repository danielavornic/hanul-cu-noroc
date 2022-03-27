$(function () {
  const slider = $('#slider');
  const slideWidth = $('.slide').width();

  const shiftSlide = () => {
    slider
      .addClass('slide-transition')
      .css('transform', `translateX(-${slideWidth}px)`);

    setTimeout(() => {
      $('.slide:last').after($('.slide:first'));
      slider
        .removeClass('slide-transition')
        .css('transform', 'translateX(0px)');
    }, 700);
  };

  const initSlider = () => {
    if (window.matchMedia('(min-width: 991px)').matches) {
      slider.css('left', `-${slideWidth * 0.7}px`);
    } else {
      slider.css('left', '0');
      clearInterval(startSlider);
    }
  };

  const startSlider = setInterval(shiftSlide, 5000);

  initSlider();
  $(window).on('resize', initSlider);
});
