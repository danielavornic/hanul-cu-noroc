$(function () {
  const hideMenu = () => {
    if (
      window.matchMedia('(max-width: 768px)').matches &&
      !$('#toggler').is(':checked')
    )
      $('.menu').hide();
    else $('.menu').show();
  };
  hideMenu();
  $(window).on('resize', hideMenu);

  $('#toggler').click(() => $('.menu').animate({width:'toggle'}, 250));
});
