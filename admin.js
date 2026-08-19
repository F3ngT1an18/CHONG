const ADMIN_USERNAME = 'FNETIAN';
const ADMIN_PASSWORD = 'Ching@123';
const loginForm = document.getElementById('admin-login-form');
const loginPanel = document.getElementById('login-panel');
const adminPanel = document.getElementById('admin-panel');
const loginError = document.getElementById('login-error');
const messagesBody = document.getElementById('messages-body');
const emptyMessages = document.getElementById('empty-messages');
const logoutButton = document.getElementById('logout-button');
const clearButton = document.getElementById('clear-messages');

function showAdminPanel() {
    loginPanel.hidden = true;
    adminPanel.hidden = false;
    renderMessages();
}

function renderMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messagesBody.replaceChildren();
    emptyMessages.hidden = messages.length > 0;

    messages.forEach((item) => {
        const row = document.createElement('tr');
        [item.name, item.email, item.message, item.date].forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        messagesBody.appendChild(row);
    });
}

if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = loginForm.elements.username.value.trim();
    const password = loginForm.elements.password.value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        loginError.textContent = '';
        showAdminPanel();
    } else {
        loginError.textContent = 'Incorrect username or password.';
    }
});

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    adminPanel.hidden = true;
    loginPanel.hidden = false;
    loginForm.reset();
});

clearButton.addEventListener('click', () => {
    localStorage.removeItem('contactMessages');
    renderMessages();
});
