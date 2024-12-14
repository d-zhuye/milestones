import deleteIcon from "../assets/delete-icon.svg";
import { displayTaskModal } from "./modal-control";
import { projectsLibrary } from "./task-manager";
import { populateStorage } from "./local-storage";

export let displayTracker = "Tasks";

function changeMainHeader () {
  const headerNameElement = document.getElementById("main-header-name");
  headerNameElement.textContent = displayTracker;
}


// The below section handles appending projects and tasks onto webpage
const listDisplay = document.getElementById("list-display");

function iterateAndRenderTasks(project) {
  if (displayTracker === "Tasks") {
    displayAllTasks();
    return
  };
  
  listDisplay.innerHTML = "";
  project.tasks.forEach((task) => {
    appendTasks(task);
  });
}

function displayByProject(projectName) {
  const projectsLibrary = JSON.parse(localStorage.getItem("projects-library"));

  const displayedProject = projectsLibrary.library.find((storedProject) => {
    return storedProject.name === projectName;
  });

  iterateAndRenderTasks(displayedProject);
}

export function appendProjects() {
  const projectsLibrary = JSON.parse(localStorage.getItem("projects-library"));
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";
  const projectSelect = document.getElementById("project-select");
  projectSelect.innerHTML = "";

  // Append each project to projects-list
  projectsLibrary.library.forEach((project) => {
    const newLi = document.createElement("li");
    newLi.textContent = project.name;
    newLi.classList.add("project");
    projectsList.appendChild(newLi);

    // Append each project as an option to project-select
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.appendChild(option);

    // Listen Event. Display Own Tasks When Clicked
    newLi.addEventListener("click", (event) => {
      event.stopPropagation();
      displayTracker = project.name;
      changeMainHeader();
      iterateAndRenderTasks(project);
    });
  });

  if (displayTracker === "Tasks") {
    displayAllTasks();
  } else {
    displayByProject(displayTracker);
  }
  changeMainHeader();
}

function newParagraph(content, classList, parentContainer) {
  const p = document.createElement("p");
  p.classList.add(classList);
  p.innerHTML = content;
  parentContainer.appendChild(p);
}

function appendTasks(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  listDisplay.appendChild(taskContainer);

  // Adds a checkbox. If isChecked property is true, then checkbox spawns as
  // true. Adds event listener to toggle between isChecked and Strikethrough
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");
  if (task.isChecked) {
    checkBox.checked = true;
    taskContainer.classList.add("strike-through");
  }
  taskContainer.appendChild(checkBox);
  checkBox.addEventListener("click", (event) => {
    event.stopPropagation();
    if (checkBox.checked) {
      task.isChecked = true;
      taskContainer.classList.add("strike-through");
    } else {
      task.isChecked = false;
      taskContainer.classList.remove("strike-through");
    }
  });

  // Call on function factory to create new P
  newParagraph(task.title, "task-title", taskContainer);
  newParagraph(task.deadline, "task-deadline", taskContainer);

  // Add delete icon
  const icon = document.createElement("img");
  icon.src = deleteIcon;
  icon.classList.add("delete-icon");

  icon.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTask(task);
  })

  taskContainer.appendChild(icon);

  taskContainer.addEventListener("click", (event) => {
    displayTaskModal(task);
    event.stopPropagation();
  });
}

export function displayAllTasks() {
  listDisplay.innerHTML = "";
  displayTracker = "Tasks";
  projectsLibrary.library.forEach((project) => {
    project.tasks.forEach((task) => {
      appendTasks(task);
    });
  });
}

export function deleteTask(deletedTask) {
    // Return project containing deletedTask
    const assignedProject = projectsLibrary.library.find((project) => {
      return project.name == deletedTask.assignedProject;
    });

    // Return exact task  that matches deletedTask. Used title and deadline
    // criteria to circumvent error with finding match with exact object
    const locatedTask = assignedProject.tasks.find((task) => {
      return (
        task.title === deletedTask.title &&
        task.deadline === deletedTask.deadline
      );
    });

    // Locate project and task index
    const projectIndex = projectsLibrary.library.indexOf(assignedProject);
    const taskIndex = assignedProject.tasks.indexOf(locatedTask);

    // Splice task and update localStorage
    projectsLibrary.library[projectIndex].tasks.splice(taskIndex, 1);
    populateStorage();
}
