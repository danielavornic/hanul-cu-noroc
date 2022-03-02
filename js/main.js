$(function () {
  $('#loading').fadeOut(300);

  const menu = $('#menu');
  const menuIcon = $('#menu-icon');
  const menuLogo = $('.menu-center .logo').first();
  const header = $('header').first();
  const wrapper = $('#wrapper');
  let prevSt = 0;

  const isScreenLg = () => window.matchMedia('(min-width: 769px)').matches;

  const toggleMenu = () => {
    menu
      .animate({ 'margin-right': menu.hasClass('hidden') ? '0' : '-100%' })
      .toggleClass('hidden');
    menuIcon.toggleClass('active');
    wrapper.toggleClass('blur');
  };

  const toggleMenuOnResize = () => {
    if (isScreenLg()) {
      menu.css('margin-right', 0);
      wrapper.removeClass('blur');
    } else {
      if (menu.hasClass('hidden')) {
        menu.css('margin-right', '-100%');
        wrapper.removeClass('blur');
      } else {
        wrapper.addClass('blur');
      }
    }
  };

  const toggleNavOnScroll = () => {
    if (isScreenLg()) {
      let st = $(this).scrollTop();
      if (st <= 0 || st > prevSt) {
        header.removeClass('sticky');
        if (header.hasClass('transparent'))
          menuLogo.attr('src', '../images/logos/logo-white.png');
        if (st > prevSt) header.addClass('hidden');
      } else {
        header.removeClass('hidden').addClass('sticky');
        if (header.hasClass('transparent'))
          menuLogo.attr('src', '../images/logos/logo.png');
      }
      prevSt = st;
    }
  };

  menuIcon.click(toggleMenu);
  $(window).on('resize', toggleMenuOnResize);
  $(window).scroll(toggleNavOnScroll);

  if ($(window).scrollTop() > 0 && isScreenLg())
    header.removeClass('sticky').addClass('hidden');

  AOS.init();

  $('.tilting-image').tilt({
    scale: 1.02,
    maxTilt: 10,
  });
});
