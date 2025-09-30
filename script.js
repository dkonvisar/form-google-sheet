const scriptURL =
  'https://script.google.com/macros/s/AKfycbxFqwPOWNA5w2sm4w8hSZX6n_62KeTKMmloFn_cNgEMymOMyhkoPYuNFhMuAPgCujI3cA/exec';

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const roleBtns = document.querySelectorAll('.btn-role');
let roleInput = form.querySelector('#role');
const formResponseMsg = form.parentElement.querySelector('#responseMsg');

let roleStatus = ''; // default role

document.querySelectorAll('.btn-role').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    const roleAttr = btn.getAttribute('data-role');
    roleStatus = roleAttr;
  });
});

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
    role: roleStatus || 'member', // default role if none selected
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
      roleStatus = ''; // reset role status

      setTimeout(() => {
        formResponseMsg.innerText = '';
      }, 2000);
    })
    .catch(err => console.log('Error: ' + err));
});
