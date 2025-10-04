document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("back-btn");
  const sessionList = document.getElementById("session-list");

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  function renderTasks() {
    sessionList.innerHTML = "";

    if (tasks.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No study sessions found.";
      li.style.fontStyle = "italic";
      sessionList.appendChild(li);
      return;
    }

    const today = new Date();

    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const end = new Date(task.endDate);
      const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

      // Reminder for near deadline
      let reminder = "";
      if (!task.completed && diffDays <= 3 && diffDays >= 0) {
        reminder = ` ⚠️ ${diffDays} day(s) left!`;
        li.style.color = "#ffcc66";
      }

      li.className = task.completed ? "completed" : "";
      li.innerHTML = `<span>${task.name} | ${task.startDate} → ${task.endDate}${reminder}</span>`;

      // Buttons
      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Completed" : "Mark Completed";
      completeBtn.className = "complete-btn";
      completeBtn.disabled = task.completed;
      completeBtn.addEventListener("click", () => {
        task.completed = true;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);

      sessionList.appendChild(li);
    });
  }

  renderTasks();

  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});
