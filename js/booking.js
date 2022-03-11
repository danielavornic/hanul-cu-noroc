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
  const inputs = $('form input');
  const submitBtn = $('#submit-btn');
  const submitMess = $('#submit-message');

  const formatDate = (date) => date.split('-').reverse().join('/');

  const getFormData = (form) => {
    const elements = form.elements;
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
      const val = elements[name].value;
      formData[name] = name.includes('check') ? formatDate(val) : val;
    });

    return formData;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitBtn.attr('disabled', true);

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
        submitMess.fadeIn();
        $('.section-heading').addClass('less-mb');
        $('h2').text('Mesajul a fost trimis cu succes!');
        $('.subheading').text('Formular trimis');
      }
    };
    xhr.send(encoded);
  };

  const changeInputBorderColor = (e) =>
    $(e.target).css(
      'border-color',
      e.target.checkValidity() ? 'var(--green)' : 'red'
    );

  const changeInputsBorderColor = () => {
    inputs.each((i) => {
      inputs
        .eq(i)
        .css(
          'border-color',
          inputs[i].checkValidity() ? 'var(--light-gray)' : 'red'
        );
    });
  };

  submitMess.hide();
  inputs.keydown(changeInputBorderColor).change(changeInputBorderColor);
  submitBtn.click(changeInputsBorderColor);
  $('form').submit(handleFormSubmit);
});