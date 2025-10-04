document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-task-btn");
  const backBtn = document.getElementById("back-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  addTaskBtn.addEventListener("click", () => {
    const name = document.getElementById("task-name").value.trim();
    const startDate = document.getElementById("task-start-date").value;
    const endDate = document.getElementById("task-end-date").value;

    if (!name || !startDate || !endDate ) {
      alert("Please fill all fields.");
      return;
    }

    tasks.push({
      name,
      startDate,
      endDate,
      completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear inputs
    document.getElementById("task-name").value = "";
    document.getElementById("task-start-date").value = "";
    document.getElementById("task-end-date").value = "";

    alert("Task added successfully!");
  });

  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});
