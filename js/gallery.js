$(function () {
  const lbWrapper = $('.lightbox-wrapper');
  const lbImg = $('.lightbox-content img');
  const galleryItem = $('#gallery-grid .item');

  const hideLightbox = () => {
    lbWrapper.fadeOut();
    $('html').css('overflow-y', 'auto');
  };

  const setLbImg = (img) => {
    const imgSrc = img.attr('src');
    const imgAlt = img.attr('alt');
    lbImg.attr({ src: `../${imgSrc}`, alt: imgAlt });
  };

  const shiftLbImg = (isRightDir) => {
    const currImg = lbImg.attr('src').substr(3);
    const currItem = $('#gallery-grid').find(`img[src$='${currImg}']`).parent();
    const prssedBtn = isRightDir ? $('.next-btn') : $('.prev-btn');
    let nextItem = isRightDir ? currItem.next() : currItem.prev();
    if (nextItem.length == 0)
      nextItem = isRightDir ? galleryItem.first() : galleryItem.last();

    setTimeout(() => {
      setLbImg(nextItem.find('>:first-child'));
      $('.arrow-btn').removeClass('pressed');
    }, 200);
    lbImg.fadeOut(200).fadeIn(200);
    prssedBtn.addClass('pressed');
  };

  $('.close-btn').click(hideLightbox);

  $('.lightbox-container').click((e) => {
    if ($(e.target).hasClass('lightbox-container')) hideLightbox();
  });

  galleryItem.click(function () {
    if (window.matchMedia('(min-width: 991px)').matches) {
      setLbImg($(this).find('>:first-child'));
      lbWrapper.fadeIn();
      $('html').css('overflow-y', 'hidden');
    }
  });

  $(document).keydown((e) => {
    const isArrowKeyPressed = e.which === 39 || e.which === 37;
    if (lbWrapper.css('display') === 'block' && isArrowKeyPressed)
      shiftLbImg(e.which === 39);
  });

  $('.arrow-btn').click((e) => {
    const isNextBtnPressed = $(e.target).hasClass(
      'next-btn' || 'icofont-thin-right'
    );
    shiftLbImg(isNextBtnPressed);
  });

  hideLightbox();
});
