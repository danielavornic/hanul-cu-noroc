$(function () {
  $('#nav-tabs li:first-child').addClass('active');
  $('.tab').hide();
  $('.tab:first-child').show();

  $('#nav-tabs li').click(function () {
    $('#nav-tabs li').removeClass('active');
    $(this).addClass('active');
    $('.tab').hide();
    const activeTab = $(this).find('span').attr('data-tab');
    $(activeTab).fadeIn();
  });
});
