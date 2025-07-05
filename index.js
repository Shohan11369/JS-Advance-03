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
