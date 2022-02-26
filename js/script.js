$(function () {
  const menu = $('#menu');
  const menuIcon = $('#menu-icon');
  const hero = $('#hero');

  $(window).on('resize', () => {
    if (window.matchMedia('min-width: 768px').matches)
      menu.css('margin-right', 0);
  });

  menuIcon.click(() => {
    menu.animate({
      'margin-right': menu.hasClass('hidden') ? '0' : '-100%',
    });
    menu.toggleClass('hidden');
    menuIcon.toggleClass('active');
    hero.toggleClass('blurred');
  });
});
