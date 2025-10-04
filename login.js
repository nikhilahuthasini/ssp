document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const forgotForm = document.getElementById("forgot-form");

  const showSignupLink = document.getElementById("show-signup");
  const showLoginLinks = document.querySelectorAll("#show-login, #show-login-from-forgot");
  const showForgotLink = document.getElementById("show-forgot");

  // Show/hide forms
  function showLoginForm() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    if(forgotForm) forgotForm.classList.add("hidden");
  }

  function showSignupForm() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    if(forgotForm) forgotForm.classList.add("hidden");
  }

  function showForgotForm() {
    if(forgotForm) forgotForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupForm.classList.add("hidden");
  }

  // Event listeners for toggling
  showSignupLink.addEventListener("click", e => { 
    e.preventDefault(); 
    showSignupForm(); 
  });

  showForgotLink?.addEventListener("click", e => { 
    e.preventDefault(); 
    showForgotForm(); 
  });

  showLoginLinks.forEach(link => {
    link.addEventListener("click", e => { 
      e.preventDefault(); 
      showLoginForm(); 
    });
  });

  // Signup form submission
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const fullname = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.username === username)) {
      alert("Username already exists!");
      return;
    }

    const newUser = { fullname, email, username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Signup successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html";
  });

  // Login form submission
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Welcome back, ${user.fullname}!`);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password!");
    }
  });

  // Forgot Password submission
  forgotForm?.addEventListener("submit", e => {
    e.preventDefault();

    const username = document.getElementById("forgot-username").value.trim();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if(newPassword !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.username === username);

    if(userIndex === -1){
      alert("Username not found!");
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password updated successfully! Please login.");
    showLoginForm();
  });

  showLoginForm();
});
