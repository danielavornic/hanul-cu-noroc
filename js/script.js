$(function () {
  const hideMenu = () => {
    if (
      window.matchMedia('(max-width: 768px)').matches &&
      !$('#menu-icon').hasClass('active')
    )
      $('.menu').hide();
    else $('.menu').show();
  };
  hideMenu();
  $(window).on('resize', hideMenu);

  $('#menu-icon').click(() => {
    $('#menu-icon').toggleClass('active');
    $('.menu').animate({ width: 'toggle' }, 250);
  });
});
