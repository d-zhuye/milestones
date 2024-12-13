class Storage {
  constructor () {
    this.library = [];
  }
}

const projectsLibrary = new Storage("projectsLibrary")

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  pushToProjectTasks(task) {
    this.tasks.push(task);
  }
}

class Task {
  constructor(title) {
    this.title = title;
    this.isChecked = false;
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

const personal = new Project("Personal");
const school = new Project("School");

const example = new Task("example");
example.addDeadline("04/05/2030");
example.addPriority("high");
example.addDescription("This is an example description");

projectsLibrary.library.push(personal);
projectsLibrary.library.push(school);

personal.pushToProjectTasks(example);

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

export {projectsLibrary, Project, Task};