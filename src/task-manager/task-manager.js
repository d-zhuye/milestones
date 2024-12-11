import deleteIcon from "../src/task-manager/delete-icon.svg"

class User {
  constructor(username) {
    this.username = username;
    this.projects = [];
  }

  pushToUserProjects(project) {
    this.projects.push(project);
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  pushToProjectTasks(task) {
    this.tasks.push(task);
  }

  removeFromProject(task) {

  }
}

class Task {
  constructor(title) {
    this.title = title;
  }

  addDeadline(deadline) {
    this.deadline = deadline;
  }

  addPriority(priority) {
    this.priority = priority;
  }

  addDescription(description) {
    this.description = description;
  }
}

const newUser = new User("john423");
const toDo = new Project("To Do");
const exampleProject = new Project("Another Example");

const example = new Task("example");
example.addDeadline("04/05/2030");
example.addPriority("high");
example.addDescription("This is an example description");

toDo.pushToProjectTasks(example);
newUser.pushToUserProjects(toDo);
newUser.pushToUserProjects(exampleProject);
console.log(newUser);

function newParagraph(content, classList, parentContainer) {
  const p = document.createElement("p");
  p.classList.add(classList);
  p.innerHTML = content;
  parentContainer.appendChild(p);
}

function changeTaskModal(task) {
  const taskModal = document.getElementById("task-modal");
  taskModal.classList.remove("hidden");
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("hidden");
  const taskPriority = document.getElementById("modal-priority");
  taskPriority.innerHTML = task.priority;
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
}

function appendTask(task) {
  const listDisplay = document.getElementById("list-display");
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  listDisplay.appendChild(taskContainer);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");
  taskContainer.appendChild(checkBox);
    checkBox.addEventListener("click", (event) => {
        event.stopPropagation();
        if (checkBox.checked) {
            taskContainer.classList.add("strike-through");
        } else {
            taskContainer.classList.remove("strike-through");
        }
    })

  newParagraph(task.title, "task-title", taskContainer);
  newParagraph(task.deadline, "task-deadline", taskContainer);

  const deleteIconIMG = document.createElement("img");
  deleteIconIMG.src = deleteIcon;
  deleteIconIMG.classList.add("delete-icon");
  taskContainer.appendChild(deleteIconIMG);

  taskContainer.addEventListener("click", (event) => {
    event.stopPropagation();
    changeTaskModal(task);
  });
}

function appendProjects() {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = "";
  const listDisplay = document.getElementById("list-display");
    listDisplay.innerHTML = "";
  newUser.projects.forEach((project) => {
    const newLi = document.createElement("li");
    newLi.textContent = project.name;
    newLi.classList.add("project");
    projectsList.appendChild(newLi);

    const projectSelect = document.getElementById("project-select");
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.appendChild(option);

    project.tasks.forEach((task) => {
        appendTask(task);
      });
  });
}

const newTaskForm = document.getElementById("form-modal");
newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTaskTitle = document.getElementById("new-title").value;
  const newTask = new Task(newTaskTitle);
  newTask.deadline = document.getElementById("new-deadline").value;
  newTask.priority = document.getElementById("new-priority").value;
  newTask.description = document.getElementById("new-description").value;

  const selectElement = document.getElementById("project-select").value;

  const selectedProject = newUser.projects.find((project) => {
    console.log(project);
    return project.name === selectElement;
  });

  selectedProject.pushToProjectTasks(newTask);
  appendProjects();
  newTaskForm.reset();
});

appendProjects();