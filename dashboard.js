document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const dropdown = document.getElementById("dropdown");
  const profileBtn = document.getElementById("profile-btn");
  const settingsBtn = document.getElementById("settings-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const closeDropdown = document.getElementById("close-dropdown");

  const cards = document.getElementById("cards");
  const welcomeBox = document.querySelector(".welcome-box");
  const profileContainer = document.getElementById("profile-container");
  const settingsContainer = document.getElementById("settings-container");

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { fullname: "Student", username:"-", email:"-" };
  document.getElementById("user-name").textContent = currentUser.fullname;

  // Toggle dropdown
  menuBtn.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  });

  closeDropdown.addEventListener("click", e => {
    e.preventDefault();
    dropdown.style.display = "none";
  });

  document.addEventListener("click", e => {
    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });

  // Show Profile
  profileBtn.addEventListener("click", e => {
    e.preventDefault();
    welcomeBox.style.display = "none";
    cards.style.display = "none";
    
    settingsContainer.style.display = "none"; // ← hide settings if open

    profileContainer.innerHTML = `
      <div class="profile-content">
        <h2>My Profile</h2>
        <div class="profile-box"><p><strong>Name:</strong> ${currentUser.fullname}</p></div>
        <div class="profile-box"><p><strong>Username:</strong> ${currentUser.username}</p></div>
        <div class="profile-box"><p><strong>Email:</strong> ${currentUser.email}</p></div>
        <button id="back-profile">Back</button>
      </div>
    `;
    profileContainer.style.display = "flex";

    document.getElementById("back-profile").addEventListener("click", () => {
      profileContainer.style.display = "none";
      welcomeBox.style.display = "flex";
      cards.style.display = "flex";
    });
  });

  // Show Settings
  settingsBtn.addEventListener("click", e => {
    e.preventDefault();
    welcomeBox.style.display = "none";
    cards.style.display = "none";
    
    profileContainer.style.display = "none"; // ← hide profile if open

    settingsContainer.innerHTML = `
      <div class="settings-content">
        <h2>Settings</h2>
        <div class="settings-box">
          <label>Email:</label>
          <input type="email" id="new-email" value="${currentUser.email}">
        </div>
        <div class="settings-box">
          <label>Password:</label>
          <input type="password" id="new-password" placeholder="New Password">
        </div>
        <button id="save-settings">Save</button>
        <button id="back-settings">Back</button>
      </div>
    `;
    settingsContainer.style.display = "flex";

    document.getElementById("save-settings").addEventListener("click", () => {
      const newEmail = document.getElementById("new-email").value.trim();
      const newPassword = document.getElementById("new-password").value.trim();
      if (newEmail) currentUser.email = newEmail;
      if (newPassword) currentUser.password = newPassword;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Settings updated!");
    });

    document.getElementById("back-settings").addEventListener("click", () => {
      settingsContainer.style.display = "none";
      welcomeBox.style.display = "flex";
      cards.style.display = "flex";
    });
  });

  // Logout
  logoutBtn.addEventListener("click", e => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // Motivational quotes
  const quotes = [
    "Small progress each day adds up to big results.",
    "Stay consistent, not perfect.",
    "Your only limit is you.",
    "Push yourself, because no one else will.",
    "Dream big, start small, act now."
  ];
  document.getElementById("motivation-text").textContent = quotes[Math.floor(Math.random() * quotes.length)];
});
