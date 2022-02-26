$(function () {
  const menu = $('#menu');
  const menuIcon = $('#menu-icon');

  $(window).on('resize', () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      menu.css('margin-right', 0);
      $('.blurred').removeClass('blurred');
    } else {
      if (menu.hasClass('hidden')) {
        menu.css('margin-right', '-100%');
        $('.blurred').removeClass('blurred');
      } else {
        $('body > *').not('body > header').addClass('blurred');
      }
    }
  });

  menuIcon.click(() => {
    menu.animate({
      'margin-right': menu.hasClass('hidden') ? '0' : '-100%',
    });
    menu.toggleClass('hidden');
    menuIcon.toggleClass('active');
    $('body > *').not('body > header').toggleClass('blurred');
  });
});
