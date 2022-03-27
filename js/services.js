$(function () {
  $('.nav-tab:first-child').addClass('active');
  $('.tab').hide();
  $('.tab:first-child').show();

  $('.nav-tab').click(function () {
    const activeTab = $(this).find('span').attr('data-tab');
    
    $('.tab').hide();
    $('.nav-tab').removeClass('active');
    $(this).addClass('active');
    $(activeTab).fadeIn();
  });
});
