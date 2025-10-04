document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("back-btn");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const pendingList = document.getElementById("pending-sessions");
  const completedList = document.getElementById("completed-sessions");

  // Create message element
  const progressContainer = document.querySelector(".progress-container");
  const messageEl = document.createElement("p");
  messageEl.style.fontStyle = "italic";
  messageEl.style.color = "#ffcc66";
  progressContainer.insertBefore(messageEl, pendingList);

  // Get tasks from ls
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);

  const totalTasks = tasks.length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks.length / totalTasks) * 100);

  // Update progress bar
  progressFill.style.width = progressPercent + "%";
  progressText.textContent = `${progressPercent}% completed`;

  //messages 
  let message = "";
  if (progressPercent === 0) {
    message = "Let's get started! Every session counts!";
  } else if (progressPercent > 0 && progressPercent <= 25) {
    message = "Great start! Keep going!";
  } else if (progressPercent > 25 && progressPercent <= 50) {
    message = "You're making progress! Stay consistent!";
  } else if (progressPercent > 50 && progressPercent <= 75) {
    message = "Awesome work! Almost there!";
  } else if (progressPercent > 75 && progressPercent < 100) {
    message = "So close! Finish strong!";
  } else if (progressPercent === 100) {
    message = "Amazing! All sessions completed! 🎉";
  }

  messageEl.textContent = message;

  // Rendering pending tasks
  if (pendingTasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No pending sessions.";
    pendingList.appendChild(li);
  } else {
    pendingTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.name} | ${task.date}`;
      pendingList.appendChild(li);
    });
  }

  // Rendering completed tasks
  if (completedTasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No completed sessions.";
    completedList.appendChild(li);
  } else {
    completedTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.name} | ${task.date}`;
      li.classList.add("completed");
      completedList.appendChild(li);
    });
  }

  // Back button
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});
