$(function () {
  $('#loading').fadeOut(300);

  const topBar = $('.top-bar');
  const menu = $('#menu');
  const menuIcon = $('#menu-icon');
  const menuLogo = $('.menu-center .logo');
  const nav = $('nav');
  const scrollTop = $('#scroll-top');
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

  // in case you test using the browser developer tools and resize the window :3
  const toggleMenuOnResize = () => {
    if (isScreenLg()) {
      menu.css('margin-right', 0);
      wrapper.removeClass('blur');
    } else {
      nav.removeClass('hidden');
      if (menu.hasClass('hidden')) {
        menu.css('margin-right', '-100%');
        wrapper.removeClass('blur');
      } else {
        wrapper.addClass('blur');
      }
    }
  };

  const toggleNavOnScroll = () => {
    const logoWhiteSrc = '../images/logos/logo-white.png';
    const logoBlackSrc = '../images/logos/logo.png';

    if (isScreenLg()) {
      let st = $(this).scrollTop();
      if (st <= 0 || st > prevSt) {
        nav.removeClass('sticky');
        if (st > prevSt && st > 20) {
          nav.addClass('hidden');
          topBar.addClass('hidden');
        } else if (st == 0) topBar.removeClass('hidden');
        if (nav.hasClass('transparent')) 
          menuLogo.attr('src', logoWhiteSrc);
      } else {
        nav.removeClass('hidden').addClass('sticky');
        if (nav.hasClass('transparent')) 
          menuLogo.attr('src', logoBlackSrc);
      }
      prevSt = st;
    }
  };

  menuIcon.click(toggleMenu);
  $(window).on('resize', toggleMenuOnResize);
  $(window).scroll(toggleNavOnScroll);
  scrollTop.click(() => $(window).scrollTop(0));

  if ($(window).scrollTop() > 0 && isScreenLg())
    nav.removeClass('sticky').addClass('hidden');

  AOS.init({
    disable: 'mobile',
    once: true,
  });

  if ($('.tilting-img').length)
    $('.tilting-img').tilt({
      maxTilt: 10,
    });
});
