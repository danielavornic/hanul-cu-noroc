$(function () {
  $('.nav-tab:first-child').addClass('active');
  $('.tab').hide();
  $('.tab:first-child').show();

  $('.nav-tab').click(function () {
    $('.nav-tab').removeClass('active');
    $(this).addClass('active');
    $('.tab').hide();
    const activeTab = $(this).find('span').attr('data-tab');
    $(activeTab).fadeIn();
  });
});
