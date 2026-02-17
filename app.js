const loginPanel = document.querySelector('#login-panel');
const dashboardPanel = document.querySelector('#dashboard-panel');
const loginButtons = document.querySelectorAll('[data-open-login]');
const loginForm = document.querySelector('#login-form');
const agentForm = document.querySelector('#agent-form');
const successMessage = document.querySelector('#success-message');

loginButtons.forEach((button) => {
  button.addEventListener('click', () => {
    loginPanel.classList.remove('hidden');
    loginPanel.scrollIntoView({ behavior: 'smooth' });
  });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  dashboardPanel.classList.remove('hidden');
  dashboardPanel.scrollIntoView({ behavior: 'smooth' });
});

agentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(agentForm);
  const process = formData.get('process');
  const persona = formData.get('persona');

  successMessage.textContent = `Agent draft created: ${process} — persona set as "${persona}". API keys are kept as local input only in this demo UI.`;
  successMessage.classList.remove('hidden');
});
