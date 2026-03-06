// ---------- Login page ----------
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = new FormData(loginForm).get('email');
    sessionStorage.setItem('lexiforge_user', email);
    window.location.href = 'dashboard.html';
  });
}

// ---------- Google sign-in button ----------
const googleBtn = document.querySelector('#google-btn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    sessionStorage.setItem('lexiforge_user', 'demo@google.com');
    window.location.href = 'dashboard.html';
  });
}

// ---------- Dashboard page ----------
const agentForm = document.querySelector('#agent-form');
if (agentForm) {
  const user = sessionStorage.getItem('lexiforge_user');

  // Redirect to login if not authenticated
  if (!user) {
    window.location.href = 'login.html';
  }

  // Show user email in nav
  const userEmail = document.querySelector('#user-email');
  if (userEmail && user) {
    userEmail.textContent = user;
  }

  // Load saved agents
  const agents = JSON.parse(localStorage.getItem('lexiforge_agents') || '[]');
  renderAgents(agents);

  agentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(agentForm);
    const process = formData.get('process');
    const persona = formData.get('persona');
    const description = formData.get('description');

    const agent = { process, persona, description, created: new Date().toLocaleString() };
    agents.push(agent);
    localStorage.setItem('lexiforge_agents', JSON.stringify(agents));

    const successMessage = document.querySelector('#success-message');
    successMessage.textContent = `Agent created: ${process} — persona "${persona}".`;
    successMessage.classList.remove('hidden');
    setTimeout(() => successMessage.classList.add('hidden'), 4000);

    agentForm.reset();
    renderAgents(agents);
  });
}

function renderAgents(agents) {
  const grid = document.querySelector('#agents-grid');
  const empty = document.querySelector('#agents-empty');
  if (!grid) return;

  if (agents.length === 0) {
    empty.classList.remove('hidden');
    grid.innerHTML = '';
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = agents
    .map(
      (a) => `
      <div class="agent-card">
        <h3>${a.process}</h3>
        <p>${a.persona}</p>
      </div>`
    )
    .join('');
}

// ---------- Logout ----------
const logoutBtn = document.querySelector('#logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    sessionStorage.removeItem('lexiforge_user');
    window.location.href = 'login.html';
  });
}
