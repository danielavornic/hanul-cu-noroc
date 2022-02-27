$(function () {
  $("#loading").fadeOut(300);

  const menu = $('#menu');
  const menuIcon = $('#menu-icon');
  const menuLogo = $('header .menu-center img').first();
  const header = $('header').first();
  let prevSt = 0;

  const toggleMenu = () => {
    menu.animate({
      'margin-right': menu.hasClass('hidden') ? '0' : '-100%',
    });
    menu.toggleClass('hidden');
    menuIcon.toggleClass('active');
    $('body > *').not('body > header').toggleClass('blurred');
  };

  const toggleMenuOnResize = () => {
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
  };

  const toggleNavOnScroll = () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      let st = $(this).scrollTop();
      if (st <= 0 || st > prevSt) {
        header.removeClass('sticky');
        menuLogo.attr('src', '../images/logos/logo-white.png');
        if (st > prevSt) header.addClass('hidden');
      } else {
        header.removeClass('hidden').addClass('sticky');
        menuLogo.attr('src', '../images/logos/logo.png');
      }
      prevSt = st;
    }
  };

  menuIcon.click(toggleMenu);
  $(window).on('resize', toggleMenuOnResize);
  $(window).scroll(toggleNavOnScroll);

  AOS.init();
});
