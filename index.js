// Javascript start

let current = null;
function showSignIn() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("signin").classList.remove("hidden");
}

function showSignUp() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("signin").classList.remove("hidden");
}

// SignUP Start
function signUp() {
  const name = document.getElementById("signup-name").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const error = document.getElementById("signup-error");

  if (!name || !username || !password) {
    error.textContent = "All Fields are required";
    error.classList.remove("hidden");
    return;
  }

  if (localStorage.getItem("user_" + username)) {
    error.textContent = "Username already exists.";
    error.classList.remove("hidden");
    return;
  }

  const user = {
    name,
    username,
    password,
    balance: 0,
    history: [],
  };

  localStorage.setItem("user_" + username, JSON.stringify(user));
  alert("Account successfully created. Now login");
  showSignIn();
}

// SignIn start

function signIn() {
  const username = document.getElementById("signin-username").value.trim();
  const password = document.getElementById("signin-password").value.trim();
  const error = document.getElementById("signin-error");

  const stored = localStorage.getItem("user_" + username);
  if (!stored) {
    error.textContent = "user not found";
    error.classList.remove("hidden");
    return;
  }

  const user = JSON.parse(stored);
  if (user.password !== password) {
    error.textContent = "Incorrect password";
    error.classList.remove("hidden");
    return;
  }

  currentUser = user;
  loadDashboard();
}

// DashBoard Start

function loadDashboard() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("signin").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("user-name").textContent = currentUser.name;
  document.getElementById("balance").textContent =
    currentUser.balance.toFixed(2);
  updateHistory();
}

// AddMoney option

function AddMoney() {
  const amount = parseFloat(document.getElementById("add-amount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  currentUser.balance += amount;
  addTransaction("Add", amount);
}

// WithDraw Money option

function WithDrawMoney() {
  const amount = parseFloat(Document.getElementById("withdraw-amount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  if (amount > currentUser.balance) {
    alert("Insufficient balance");
    return;
  }

  currentUser.balance -= amount;
  addTransaction("Withdraw", amount);
}
