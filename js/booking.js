$(function () {
  // set min/max of date inputs
  const minDate = new Date().toLocaleDateString('en-ca');
  const checkIn = $('#check-in');
  const checkOut = $('#check-out');
  checkIn.attr('min', minDate);
  checkOut.attr('min', minDate);
  checkIn.change(() => checkOut.attr('min', checkIn.val()));
  checkOut.change(() => checkIn.attr('max', checkOut.val()));

  // form handler using google scripts
  // guide: https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server
  const getFormData = (form) => {
    const { elements } = form;
    const fields = Object.keys(elements)
      .map((k) =>
        elements[k].name !== undefined
          ? elements[k].name
          : elements[k].length > 0
          ? elements[k].item(0).name
          : null
      )
      .filter((item, pos, self) => self.indexOf(item) == pos && item);

    let formData = {
      formDataNameOrder: JSON.stringify(fields),
      formGoogleSheetName: form.dataset.sheet || 'responses',
      formGoogleSendEmail: form.dataset.email || '',
    };

    fields.forEach((name) => {
      const { value } = elements[name];
      formData[name] = name.includes('check')
        ? value.split('-').reverse().join('/')
        : value;
    });

    return formData;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    $('#submit-btn').prop('disabled', true).css('cursor', 'not-allowed');

    const form = e.target;
    const url = form.action;
    const data = getFormData(form);
    const encoded = Object.keys(data)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      .join('&');
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        $('form').fadeOut();
        $('#submit-message').fadeIn();
        $('.section-heading').addClass('less-mb');
        $('h2').text('Mesajul a fost trimis cu succes!');
        $('.subheading').text('Formular trimis');
      }
    };
    xhr.send(encoded);
  };

  const inputs = $('form input');

  const isInputValid = (element) => {
    if (element.id === 'telefon')
      return $(element)
        .val()
        .match(/^0\d{8}$/);

    return element.checkValidity();
  };

  const changeInputBorderColor = (element) => {
    if (isInputValid(element)) {
      $(element).removeClass('invalid');
    } else {
      $(element).addClass('invalid');
    }
  };

  const changeInputsBorderColor = () =>
    inputs.each((i) => changeInputBorderColor(inputs.eq(i)[0]));

  $('#submit-message').hide();
  inputs.on('keydown input focus', (e) => changeInputBorderColor(e.target));
  $('#submit-btn').click(changeInputsBorderColor);
  $('form').submit(handleFormSubmit);
});
