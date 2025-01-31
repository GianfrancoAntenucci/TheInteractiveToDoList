// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task}</span>
        <div class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `;
      taskList.appendChild(li);

      // Add event listeners for delete and edit buttons
      li.querySelector(".delete").addEventListener("click", () => deleteTask(index));
      li.querySelector(".edit").addEventListener("click", () => enableEditTask(li, index));
    });
  };

  const addTask = () => {
    const taskValue = taskInput.value.trim();
    if (taskValue && !tasks.includes(taskValue)) {
      tasks.push(taskValue);
      taskInput.value = "";
      saveToLocalStorage();
      renderTasks();
    } else {
      alert("Invalid or duplicate task!");
    }
  };

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveToLocalStorage();
    renderTasks();
  };

  const enableEditTask = (li, index) => {
    const span = li.querySelector("span");
    const actions = li.querySelector(".actions");

    // Replace span with an input field
    const input = document.createElement("input");
    input.type = "text";
    input.value = tasks[index];
    li.replaceChild(input, span);

    // Change "Edit" button to "Save"
    const editBtn = actions.querySelector(".edit");
    editBtn.textContent = "Save";
    editBtn.classList.add("save");

    // Add event listener for saving the edited task
    editBtn.addEventListener("click", () => saveEditTask(li, input, index), { once: true });
  };

  const saveEditTask = (li, input, index) => {
    const newTask = input.value.trim();
    if (newTask && !tasks.includes(newTask)) {
      tasks[index] = newTask;
      saveToLocalStorage();
      renderTasks();
    } else {
      alert("Invalid or duplicate task!");
    }
  };

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Initial render from localStorage
  renderTasks();
});
