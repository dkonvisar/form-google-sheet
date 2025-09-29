const scriptURL =
  'https://script.google.com/macros/s/AKfycbwl94ROuzKWCTmc8ofFLYWmn2MYRTIbilWZh93BWbUBFSIIA9RaCoPq8LdYjv1tn0TC/exec';

const form = document.getElementById('form');
const submitBtn = form.querySelector('button');
const formResponseMsg = form.parentElement.querySelector('#responseMsg');

// Disable submit button if form is invalid
const toggleButton = submitBtn => {
  submitBtn.disabled = !form.checkValidity();
};

form.addEventListener('input', () => toggleButton(submitBtn));
form.addEventListener('change', () => toggleButton(submitBtn));

toggleButton(submitBtn);

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  formResponseMsg.innerText = '⏳ Sending...';

  const data = {
    name: form.name.value,
    email: form.email.value,
    website: form.website.value, // honeypot
  };
  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => {
      formResponseMsg.innerText = '✅ Message sent!';
      form.reset();

      setTimeout(() => {
        formResponseMsg.innerText = '';
      }, 2000);
    })
    .catch(err => console.log('Error: ' + err));
});
