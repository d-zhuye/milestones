import { deleteTask } from "./DOM";

const overlay = document.querySelector(".overlay");

export default function () {
  const openForm = document.getElementById("open-form");
  const formModal = document.getElementById("form-modal");
  const formSubmit = document.getElementById("submit-form");

  openForm.addEventListener("click", (event) => {
    event.stopPropagation();
    formModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  const closeModal = document.getElementById("close-form");
  closeModal.addEventListener("click", (event) => {
    event.stopPropagation();
    formModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  formSubmit.addEventListener("click", (event) => {
    event.stopPropagation();
    formModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}

export function displayTaskModal(task) {

  const taskModal = document.getElementById("task-modal");
  taskModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const taskTitle = document.getElementById("modal-title");
  taskTitle.innerHTML = task.title;
  const taskDeadline = document.getElementById("modal-deadline");
  taskDeadline.innerHTML = task.deadline;
  const taskDescription = document.getElementById("modal-description");
  taskDescription.innerHTML = task.description;

  const closeTask = document.getElementById("close-task");
  closeTask.addEventListener("click", (event) => {
    event.stopPropagation();
    taskModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  const deleteTaskButton = document.getElementById("delete-task");
  deleteTaskButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTask(task);
    taskModal.classList.add("hidden");
    overlay.classList.add("hidden");
  })
}
