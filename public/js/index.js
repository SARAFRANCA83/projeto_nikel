const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogger();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checksession = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if (!account || account.password !== password) {
    alert("Ops! Verifique o usuário ou a senha.");
    return;
  }

  saveSession(email, checksession);
  window.location = "home.html";
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 5) {
    alert("Preencha o campo com e-mail válido");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 dígitos");
    return;
  }

  saveAccount({
    login: email,
    password: password,
    transaction: [],
  });

  myModal.hide();
  alert("Conta criada com sucesso!");
});

function checkLogger() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    window.location.href = "home.html";
  }
}

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }
  sessionStorage.setItem("logged", data); // Corrigido de "logger" para "logged"
}

function getAccount(key) {
  const account = localStorage.getItem(key);
  return account ? JSON.parse(account) : "";
}
