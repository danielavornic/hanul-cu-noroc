$(function () {
  const lbContainer = $('.lightbox-container');
  const lbImg = $('.lightbox-img img');
  const galleryItem = $('#gallery-grid .item');

  const hideLightbox = () => {
    lbContainer.fadeOut();
    $('html').css('overflow-y', 'auto');
  };

  const setLbImg = (img) =>
    lbImg.attr({ src: `../${img.attr('src')}`, alt: img.attr('alt') });

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

  $('.lightbox').click(function (e) {
    if ($(e.target).hasClass('lightbox')) hideLightbox();
  });

  galleryItem.click(function () {
    if (window.matchMedia('(min-width: 991px)').matches) {
      setLbImg($(this).find('>:first-child'));
      lbContainer.fadeIn();
      $('html').css('overflow-y', 'hidden');
    }
  });

  $('.arrow-btn').click(function (e) {
    const isNextBtnPressed = $(e.target).hasClass('next-btn' || 'icofont-thin-right');
    shiftLbImg(isNextBtnPressed);
  });

  $(document).keydown(function (e) {
    const isArrowKeyPressed = e.which === 39 || e.which === 37;
    if (isArrowKeyPressed && lbContainer.css('display') === 'block')
      shiftLbImg(e.which === 39);
  });

  hideLightbox();
});
